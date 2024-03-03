import Web3 from 'web3';
import { BSC_RPC_URL, MULTI_CALL_CONTRACT_ADDRESS } from '@/env';
import Multicall from '@dopex-io/web3-multicall';

export const MultiCallContract = () => {
  const contractInstance = new Multicall({
    multicallAddress: '0x50f6210b85d38F5d0E660D6C8978C9bdCd12F130',
    provider: new Web3.providers.HttpProvider(
      'https://data-seed-prebsc-1-s1.binance.org:8545'
    ),
  });

  return contractInstance;
};

export const multiCallFun = async (list: any) => {
  try {
    const dpxContract = MultiCallContract();
    return await dpxContract.aggregate(list);
  } catch (e: any) {
    return [];
  }
};
