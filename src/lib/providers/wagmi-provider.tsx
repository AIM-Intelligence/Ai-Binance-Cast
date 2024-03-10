"use client";

import { createConfig, WagmiProvider, http } from "wagmi";
import { bscTestnet, mainnet, sepolia } from "wagmi/chains";
import { defineChain } from "viem";
import { metaMask } from "wagmi/connectors";
// import { configureChains } from '@wagmi/core';
// import { bscTestnet } from '@wagmi/core/chains';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
// const gfChain1: Chain = {
//   id: Number(process.env.GF_CHAIN_ID),
//   name: "Greenfield Testnet",
//   rpcUrls: {
//     default: {
//       http: [process.env.GF_RPC_URL!],
//     },
//     public: {
//       http: [process.env.GF_RPC_URL!],
//     },
//   },
//   nativeCurrency: {
//     name: "tBNB",
//     symbol: "tBNB",
//     decimals: 18,
//   },
// };

const gfChain = defineChain({
  id: 5600,
  name: "Greenfield Testnet",
  network: "greenfield",
  nativeCurrency: {
    decimals: 18,
    name: "tBNB",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: {
      http: ["https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org"],
    },
    public: {
      http: ["https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org"],
    },
  },
  blockExplorers: {
    etherscan: { name: "Greenfieldscan", url: "https://greenfieldscan.com/" },
    default: { name: "Greenfieldscan", url: "https://greenfieldscan.com/" },
  },
  testnet: true,
});

// const { chains, publicClient } = configureChains(
//   [bscTestnet, gfChain],
//   [publicProvider()]
// );

export default function WagmiProviderSet({
  children,
}: {
  children: React.ReactNode;
}) {
  // const config = createConfig({
  //   autoConnect: true,
  //   connectors: [new MetaMaskConnector({ chains })],
  //   publicClient,
  //   logger: {
  //     warn: (message: string) => console.log(message),
  //   },
  // });

  const config = createConfig({
    chains: [bscTestnet, gfChain],
    connectors: [],
    transports: {
      [bscTestnet.id]: http(),
      [gfChain.id]: http(),
    },
  });

  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
