import { CHAIN_ID_WORMCHAIN, ChainId, cosmos } from '@certusone/wormhole-sdk';
import { IndexedTx, logs as cosmosLogs } from '@cosmjs/stargate';
import {
  ChainName,
  CosmosContext,
  searchCosmosLogs,
  WormholeContext,
} from '@wormhole-foundation/wormhole-connect-sdk';
import { arrayify, base58 } from 'ethers/lib/utils.js';
import { ParsedMessage, wh } from 'utils/sdk';
import { adaptParsedMessage } from '../../utils';
import { UnsignedMessage } from '../../types';
import { getCosmWasmClient } from '../utils';
import {
  FromCosmosPayload,
  GatewayTransferMsg,
  IBCTransferData,
} from '../types';
import {
  findDestinationIBCTransferTx,
  getIBCTransferInfoFromLogs,
} from './transaction';
import { BigNumber, utils } from 'ethers';
import { isGatewayChain } from '../../../utils/cosmos';

export async function getMessageFromNonCosmos(
  hash: string,
  chain: ChainName,
): Promise<UnsignedMessage> {
  const message = await wh.getMessage(hash, chain);
  if (!message.payload)
    throw new Error(`Missing payload from message ${hash} on chain ${chain}`);
  const decoded: GatewayTransferMsg = JSON.parse(
    Buffer.from(
      arrayify(message.payload, { allowMissingPrefix: true }),
    ).toString(),
  );
  const adapted: any = await adaptParsedMessage({
    ...message,
    recipient: Buffer.from(
      decoded.gateway_transfer.recipient,
      'base64',
    ).toString(),
    toChain: wh.toChainName(decoded.gateway_transfer.chain),
  });

  return {
    ...adapted,
    // the context assumes that if the transfer is payload 3, it's a relayer transfer
    // but in this case, it is not, so we clear these fields
    relayerFee: '0',
    toNativeTokenAmount: '0',
  };
}

async function parseWormchainBridgeMessage(
  wormchainTx: IndexedTx,
): Promise<ParsedMessage> {
  const message = await wh.getMessage(wormchainTx.hash, CHAIN_ID_WORMCHAIN);
  return adaptParsedMessage(message);
}

function factoryToCW20(denom: string): string {
  if (!denom.startsWith('factory/')) return '';
  const encoded = denom.split('/')[2];
  if (!encoded) return '';
  return cosmos.humanAddress('wormhole', base58.decode(encoded));
}

async function parseWormchainIBCForwardMessage(
  wormchainTx: IndexedTx,
): Promise<ParsedMessage> {
  // get the information of the ibc transfer relayed by the packet forwarding middleware
  const ibcFromSourceInfo = getIBCTransferInfoFromLogs(
    wormchainTx,
    'recv_packet',
  );

  const data: IBCTransferData = JSON.parse(ibcFromSourceInfo.data);
  const payload: FromCosmosPayload = JSON.parse(data.memo);

  const destChain = wh.toChainName(
    payload.gateway_ibc_token_bridge_payload.gateway_transfer.chain,
  );
  const ibcToDestInfo = getIBCTransferInfoFromLogs(wormchainTx, 'send_packet');
  const destTx = await findDestinationIBCTransferTx(destChain, ibcToDestInfo);
  if (!destTx) {
    throw new Error(`Transaction on destination ${destChain} not found`);
  }

  // transfer ibc denom follows the scheme {port}/{channel}/{denom}
  // with denom as {tokenfactory}/{ibc shim}/{bas58 cw20 address}
  // so 5 elements total
  const parts = data.denom.split('/');
  if (parts.length !== 5) {
    throw new Error(`Unexpected transfer denom ${data.denom}`);
  }
  const denom = parts.slice(2).join('/');
  const cw20 = factoryToCW20(denom);
  const context = wh.getContext(
    CHAIN_ID_WORMCHAIN,
  ) as CosmosContext<WormholeContext>;
  const { chainId, assetAddress: tokenAddressBytes } =
    await context.getOriginalAsset(CHAIN_ID_WORMCHAIN, cw20);
  const tokenChain = wh.toChainName(chainId as ChainId); // wormhole-sdk adds 0 (unset) as a chainId
  const tokenContext = wh.getContext(tokenChain);
  const tokenAddress = await tokenContext.parseAssetAddress(
    utils.hexlify(tokenAddressBytes),
  );

  return adaptParsedMessage({
    fromChain: wh.toChainName(CHAIN_ID_WORMCHAIN), // gets replaced later
    sendTx: wormchainTx.hash, // gets replaced later
    toChain: destChain,
    amount: BigNumber.from(data.amount),
    recipient: data.receiver,
    block: destTx.height,
    sender: data.sender,
    gasFee: BigNumber.from(destTx.gasUsed.toString()),
    payloadID: 3, // should not be required for this case
    tokenChain,
    tokenAddress,
    tokenId: {
      address: tokenAddress,
      chain: tokenChain,
    },
    emitterAddress: '',
    sequence: BigNumber.from(0),
  });
}

export async function getMessageFromCosmos(
  hash: string,
  chain: ChainName,
): Promise<UnsignedMessage> {
  // Get tx on the source chain (e.g. osmosis)
  const sourceClient = await getCosmWasmClient(chain);
  const tx = await sourceClient.getTx(hash);
  if (!tx) {
    throw new Error(`Transaction ${hash} not found on chain ${chain}`);
  }

  const logs = cosmosLogs.parseRawLog(tx.rawLog);
  const sender = searchCosmosLogs('sender', logs);
  if (!sender) throw new Error('Missing sender in transaction logs');

  // Extract IBC transfer info initiated on the source chain
  const ibcInfo = getIBCTransferInfoFromLogs(tx, 'send_packet');

  // Look for the matching IBC receive on wormchain
  // The IBC hooks middleware will execute the translator contract
  // and include the execution logs on the transaction
  // which can be used to extract the VAA
  const destTx = await findDestinationIBCTransferTx(
    CHAIN_ID_WORMCHAIN,
    ibcInfo,
  );
  if (!destTx) {
    throw new Error(
      `No wormchain transaction found for packet on chain ${chain}`,
    );
  }

  // TODO: refactor these two lines (repeated in parseWormchainIBCForwardMessage)
  const data: IBCTransferData = JSON.parse(ibcInfo.data);
  const payload: FromCosmosPayload = JSON.parse(data.memo);
  const parsed = await (isGatewayChain(
    payload.gateway_ibc_token_bridge_payload.gateway_transfer.chain,
  )
    ? parseWormchainIBCForwardMessage(destTx)
    : parseWormchainBridgeMessage(destTx));

  return {
    ...parsed,
    // add the original source chain and tx hash to the info
    // the vaa contains only the wormchain information
    fromChain: wh.toChainName(chain),
    sendTx: hash,
    sender,
  };
}
