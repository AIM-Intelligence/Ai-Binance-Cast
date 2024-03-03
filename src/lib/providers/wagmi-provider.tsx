'use client';

//import { WagmiConfig, Chain, configureChains, createClient } from 'wagmi';
import { createConfig, Chain, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { defineChain } from 'viem';
import { configureChains } from '@wagmi/core';
import { bscTestnet } from '@wagmi/core/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';
import * as env from '@/env';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
// const gfChain1: Chain = {
//   id: env.GF_CHAIN_ID,
//   network: 'greenfield',
//   rpcUrls: {
//     default: {
//       http: [env.GF_RPC_URL],
//     },
//     public: {
//       http: [env.GF_RPC_URL],
//     },
//   },
//   name: 'Greenfield Testnet',
//   nativeCurrency: {
//     name: 'tBNB',
//     symbol: 'tBNB',
//     decimals: 18,
//   },
// };

const gfChain = defineChain({
  id: 5600,
  name: 'Greenfield Testnet',
  network: 'greenfield',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: { http: ['https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org'] },
    public: { http: ['https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org'] },
  },
  blockExplorers: {
    etherscan: { name: 'Greenfieldscan', url: 'https://greenfieldscan.com/' },
    default: { name: 'Greenfieldscan', url: 'https://greenfieldscan.com/' },
  },
  testnet: true,
});

const { chains, publicClient } = configureChains(
  [bscTestnet, gfChain],
  [publicProvider(), jsonRpcProvider({
    rpc: (chain) => ({
      http: `https://${chain.id}.example.com`,
    }),
  }),]
);

export default function WagmiProviderSet({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = createConfig({
    autoConnect: true,
    connectors: [new MetaMaskConnector({ chains })],
    publicClient,
    logger: {
      warn: (message: string) => console.log(message),
    },
  });

  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
