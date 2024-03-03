'use client'
import { useAccount } from 'wagmi';
import { useStatus } from '@/hooks/custom/useStatus'; 
import { useModal } from '@/hooks/custom/useModal'; 
import { OwnActionCom } from './OwnActionCom';


import { useWalletModal } from '@/hooks/custom/useWalletModal'; 
import { Button } from '@/components/ui';

interface IActionCom {
  data: {
    id: string;
    groupName: string;
    ownerAddress: string;
    type: string;
  };
  address: string;
}
export const ActionCom = (obj: IActionCom) => {
  const { data, address } = obj;
  const { id, groupName, ownerAddress, type } = data;
  const { isConnected, isConnecting } = useAccount();

  const { status } = useStatus(groupName, ownerAddress, address);
  const { handleModalOpen } = useWalletModal();

  const modalData = useModal();
  return (
    <div className='flex items-center justify-center gap-6' >
      {status == 1 && (
        <Button
          size={'sm'}
          onClick={async () => {
            modalData.modalDispatch({
              type: 'OPEN_BUY',
              buyData: data,
            });
          }}
        >
          Buy
        </Button>
      )}
      {(status == 0 || status == 2) && (
        <OwnActionCom
          data={{
            id,
            groupName,
            ownerAddress,
            type,
          }}
          address={address}
        ></OwnActionCom>
      )}
      {status === -1 && (
        <Button
          size={'sm'}
          onClick={() => {
            if (!isConnected && !isConnecting) handleModalOpen();
          }}
        >
          Buy
        </Button>
      )}
    </div>
  );
};

