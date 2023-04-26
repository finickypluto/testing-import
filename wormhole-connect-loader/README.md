# Wormhole Connect

Integration does not get easier than this. Wormhole Connect is an easy seamless experience that will help to bring all the functionality of the Wormhole Token Bridge right into your application.

## Integrate with script/link tags

### 1. (optional) Create a JSON config with customized values:

```ts
{
  "environment": "testnet",
  "networks": ["goerli", "mumbai"],
  "tokens": ["ETH", "WETH", "MATIC", "WMATIC"],
  "mode": "light"
  "customTheme": {} // see src/theme.ts
}
```

#### Accepted values

Environment:
| Mainnet    | Testnet   |
| ---------- | --------- |
| mainnet    | testnet   |

Chains:
| Mainnet    | Testnet       |
| ---------- | ------------- |
| ethereum   | goerli        |
| polygon    | mumbai        |
| bsc        | bsc           |
| avalanche  | fuji          |
| celo       | avalanche     |
| moonbeam   | moonbasealpha |
| solana     | solana        |

Tokens:
| Mainnet | Testnet |
| ------- | ------- |
| ETH     | ETH     |
| WETH    | WETH    |
| USDC    | USDC    |
| MATIC   | MATIC   |
| WMATIC  | WMATIC  |
| BNB     | BNB     |
| WBNB    | WBNB    |
| AVAX    | AVAX    |
| WAVAX   | WAVAX   |
| FTM     | FTM     |
| WFTM    | WFTM    |
| CELO    | CELO    |
| GLMR    | GLMR    |
| WGLMR   | WGLMR   |
| SOL     | WSOL    |

Mode:
|      |       |
| ---- | ----- |
| dark | light |

Custom theme:

```js
import { dark, light, Theme } from '@wormhole-foundation/wormhole-connect';
```

### 2. Add a script and link tag

```html
<!-- paste below into index.html body -->
<script src="https://www.unpkg.com/@wormhole-foundation/wormhole-connect@0.0.1-beta.3/dist/main.js"></script>
<link href="https://www.unpkg.com/@wormhole-foundation/wormhole-connect@0.0.1-beta.3/dist/main.css" />
```

### 3. Embed it in your application

This is where your widget will appear. Specify an id of `wormhole-connect` and pass it the stringified json config to customize.

```jsx
// root element with id
<div id="wormhole-connect"></div>
// with customization
<div id="wormhole-connect" config='{"networks": ["goerli", "mumbai"], "tokens": ["ETH", "WETH", "MATIC", "WMATIC"], "mode": "light"}'></div>
// stringify JSON config
<div id="wormhole-connect" config={JSON.stringify(jsonConfig)} />
```

## Integrate with React

```jsx
import WormholeBridge from '@wormhole-foundation/wormhole-connect';
function App() {
  return (
    <WormholeBridge />
  );
}
```

Specify networks/tokens (optional)
```jsx
import WormholeBridge, { WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect';
const config: WormholeConnectConfig = {
  environment: "mainnet",
  networks: ["ethereum", "polygon", "solana"],
  tokens: ["ETH", "WETH", "MATIC", "WMATIC"],
}

function App() {
  return (
    <WormholeBridge config={config} />
  );
}
```

Customize theme (optional)
```jsx
import WormholeBridge, { light, Theme, WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect';
import lightblue from '@mui/material/colors/lightBlue';

// alters the `light` theme
const customized: Theme = light;
customized.success = lightblue;
customized.background.default = 'transparent';
customized.button.action = '#81c784';
customized.button.actionText = '#000000';

const config: WormholeConnectConfig = {
  mode: 'light',
  customTheme: customized,
}

function App() {
  return (
    <WormholeBridge config={config} />
  );
}
```

Create fully customized theme (optional)
```jsx
import WormholeBridge, { Theme, OPACITY, WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect';
import lightblue from '@mui/material/colors/lightBlue';
import grey from '@mui/material/colors/grey';
import green from '@mui/material/colors/green';
import orange from '@mui/material/colors/orange';

const customized: Theme = {
  primary: grey,
  secondary: grey,
  divider: '#ffffff' + OPACITY[20],
  background: {
    default: '#232323',
  },
  text: {
    primary: '#ffffff',
    secondary: grey[500],
  },
  error: red,
  info: lightblue,
  success: green,
  warning: orange,
  button: {
    primary: '#ffffff' + OPACITY[20],
    primaryText: '#ffffff',
    disabled: '#ffffff' + OPACITY[10],
    disabledText: '#ffffff' + OPACITY[40],
    action: orange[300],
    actionText: '#000000',
    hover: '#ffffff' + OPACITY[7],
  },
  options: {
    hover: '#474747',
    select: '#5b5b5b',
  },
  card: {
    background: '#333333',
    secondary: '#474747',
    elevation: 'none',
  },
  popover: {
    background: '#1b2033',
    secondary: '#ffffff' + OPACITY[5],
    elevation: 'none',
  },
  modal: {
    background: '#474747',
  },
};
const config: WormholeConnectConfig = {
  mode: 'dark',
  customTheme: customized,
}

function App() {
  return (
    <WormholeBridge config={config} />
  );
}
```