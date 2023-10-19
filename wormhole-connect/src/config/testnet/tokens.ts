import { Icon, TokensConfig } from '../types';

export const TESTNET_TOKENS: TokensConfig = {
  ETH: {
    key: 'ETH',
    symbol: 'ETH',
    nativeChain: 'goerli',
    icon: Icon.ETH,
    coinGeckoId: 'ethereum',
    color: '#62688F',
    decimals: {
      Ethereum: 18,
      default: 8,
    },
    wrappedAsset: 'WETH',
  },
  xARC: {
    key: 'xARC',
    symbol: 'xARC',
    nativeChain: 'goerli',
    tokenId: {
      chain: 'goerli',
      address: '0xa9ec668C64a58EDfC7707489F14E29dd7FC6947F',
    },
    icon: Icon.ETH,
    coinGeckoId: 'xarc',
    color: '#000000',
    decimals: {
      default: 8,
      Ethereum: 18,
    },
  },
  WETH: {
    key: 'WETH',
    symbol: 'WETH',
    nativeChain: 'goerli',
    icon: Icon.ETH,
    tokenId: {
      chain: 'goerli',
      address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    },
    coinGeckoId: 'ethereum',
    color: '#62688F',
    decimals: {
      Ethereum: 18,
      default: 8,
    },
    foreignAssets: {
      mumbai: {
        address: '0xc6735cc74553Cc2caeB9F5e1Ea0A4dAe12ef4632',
        decimals: 18,
      },
      bsc: {
        address: '0x064a85eac6b4Bd7190BCAd3458dBD9459989c37B',
        decimals: 18,
      },
      fuji: {
        address: '0xbB5A2dC896Ec4E2fa77F40FA630582ed9c6D0172',
        decimals: 18,
      },
      fantom: {
        address: '0x758FEebDDeC06f4bCcEc8F756C8efBD35d5b7124',
        decimals: 18,
      },
      alfajores: {
        address: '0x898471a82737dFFfB61915F9e8381e279076D72b',
        decimals: 18,
      },
      moonbasealpha: {
        address: '0xd27d8883E31FAA11B2613b14BE83ad8951C8783C',
        decimals: 18,
      },
      solana: {
        address: '7VPWjBhCXrpYYBiRKZh1ubh9tLZZNkZGp2ReRphEV4Mc',
        decimals: 8,
      },
      sui: {
        address:
          '0x72831f626b1f0e11be201893d5cb641917730b1ccac778e4a77f8ab2052f0784::coin::COIN',
        decimals: 8,
      },
      aptos: {
        address:
          '0x381775005cb32cdd3dbf935ae1b978ed40d309c72b009cd4a812aab6d991418a::coin::T',
        decimals: 8,
      },
      basegoerli: {
        address: '0x44D627f900da8AdaC7561bD73aA745F132450798',
        decimals: 18,
      },
      sei: {
        address:
          'sei13pzlt9etk44hj22lckncvampq2qu2gxv6r6774f3hma4vc07wqgsmftjx7',
        decimals: 8,
      },
      arbitrumgoerli: {
        address: '0x285d75E04D78F53f4Ed29A506a7e8479EEf3035f',
        decimals: 18,
      },
      optimismgoerli: {
        address: '0x33Db338718aC89Cd8DB13B56af05be3a3029BBE5',
        decimals: 18,
      },
    },
  },
  AVAX: {
    key: 'AVAX',
    symbol: 'AVAX',
    nativeChain: 'fuji',
    icon: Icon.AVAX,
    coinGeckoId: 'avalanche-2',
    color: '#E84141',
    decimals: {
      Ethereum: 18,
      default: 8,
    },
    wrappedAsset: 'WAVAX',
  },
  WAVAX: {
    key: 'WAVAX',
    symbol: 'WAVAX',
    nativeChain: 'fuji',
    icon: Icon.AVAX,
    tokenId: {
      chain: 'fuji',
      address: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
    },
    coinGeckoId: 'avalanche-2',
    color: '#E84141',
    decimals: {
      Ethereum: 18,
      default: 8,
    },
    foreignAssets: {
      goerli: {
        address: '0x4C1b727f6df3B075E682C41a25687A69846aaC04',
        decimals: 18,
      },
      mumbai: {
        address: '0x51f3D34651523dD8CC4872ee261A1B0B3f73AceF',
        decimals: 18,
      },
      bsc: {
        address: '0x6cE9E2c8b59bbcf65dA375D3d8AB503c8524caf7',
        decimals: 18,
      },
      fantom: {
        address: '0x0f545Be981C37fB15ab7c65404648761e99016e4',
        decimals: 18,
      },
      alfajores: {
        address: '0x502c8C83008D9Dd812a7C5fB886C063060C73Dbf',
        decimals: 18,
      },
      moonbasealpha: {
        address: '0x2E8afeCC19842229358f3650cc3F091908dcbaB4',
        decimals: 18,
      },
      solana: {
        address: '3Ftc5hTz9sG4huk79onufGiebJNDMZNL8HYgdMJ9E7JR',
        decimals: 8,
      },
      sui: {
        address:
          '0xa600741c469fb57ed01497ddf101e798fa79a9c529bd176675c5c4d970811f80::coin::COIN',
        decimals: 8,
      },
      aptos: {
        address:
          '0xbe8f4301c0b54e870902b9a23eeb95ce74ac190531782aa3262337ceb145401a::coin::T',
        decimals: 8,
      },
      basegoerli: {
        address: '0x410B0EE532EFfB18fa4d90cc095B1CD58aC43d5a',
        decimals: 18,
      },
      sei: {
        address:
          'sei1mgpq67pj7p2acy5x7r5lz7fulxmuxr3uh5f0szyvqgvru3glufzsxk8tnx',
        decimals: 8,
      },
      arbitrumgoerli: {
        address: '0x92b0C4D27a05921Ded4BB117755990F567aEe049',
        decimals: 18,
      },
    },
  },
};
