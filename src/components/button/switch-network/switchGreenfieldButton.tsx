import { Loader } from '@/components/shared';
import { Button } from '@/components/ui';
import { GREEN_CHAIN_ID } from '@/config/env';
import { useSwitchNetwork } from 'wagmi';

const SwitchGreenfieldButton = () => {
  const { error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <div>
      <Button
        onClick={() => {
          switchNetwork?.(GREEN_CHAIN_ID);
        }}
        className='w-full h-[50px] mt-5 bg-[#5ed550] hover:opacity-70 text-lg'
      >
        {isLoading ? <Loader /> : 'Switch to Greenfield Testnet'}
      </Button>
    </div>
  );
};

export default SwitchGreenfieldButton;
