// import { useGetChainProviders } from './useGetChainProviders';
import Web3 from 'web3';
import ABI from './group_hub_abi.json';
import { AbiItem } from 'web3-utils';
import { BSC_RPC_URL, GROUP_HUB_CONTRACT_ADDRESS } from '@/env';

export const GroupHubContract = (sign = true) => {
  let isTrustWallet = '';
  try {
    isTrustWallet = JSON.parse(localStorage.getItem('wagmi.wallet') || '');
  } catch (e) {}

  let web3;
  if (sign) {
    web3 = new Web3(
      isTrustWallet === 'injected'
        ? (window.ethereum as any)
        : (window.ethereum as any)
    );
  } else {
    const gfProvider = new Web3.providers.HttpProvider(
      'https://data-seed-prebsc-1-s1.binance.org:8545'
    );
    web3 = new Web3(gfProvider);
  }

  const contractInstance = new web3.eth.Contract(
    ABI as AbiItem[],
    '0x50B3BF0d95a8dbA57B58C82dFDB5ff6747Cc1a9E'
  );
  return contractInstance;
};
