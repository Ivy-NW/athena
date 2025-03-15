import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, polygon, arbitrum, base, optimism } from 'wagmi/chains';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http, createStorage, cookieStorage } from 'wagmi';

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID');
}

// Define opencampus chain
const opencampus = {
  id: 656476,
  name: 'Open Campus',
  nativeCurrency: {
    name: 'Open Campus',
    symbol: 'EDU',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.open-campus-codex.gelato.digital/'],
    },
    public: {
      http: ['https://rpc.open-campus-codex.gelato.digital/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Open Campus Explorer',
      url: 'https://opencampus-codex.blockscout.com',
    },
  },
  contracts: {},
  testnet: true,
} as const; // Using 'as const' to ensure proper typing

const { wallets } = getDefaultWallets();

export const config = getDefaultConfig({
  appName: 'Thrift app',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    mainnet,
    sepolia,
    polygon,
    arbitrum,
    base,
    optimism,
    opencampus,
  ],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
    [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
    [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
    [optimism.id]: http(`https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
    [opencampus.id]: http('https://rpc.open-campus-codex.gelato.digital/'),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});