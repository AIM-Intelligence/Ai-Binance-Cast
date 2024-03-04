import { client, selectSp } from '@/client';
import { Button } from '@/components/ui';
import { MessagesContext } from '@/context/messages';
import { getOffchainAuthKeys } from '@/utils/offchainAuth';
import { useContext, useState } from 'react';
import { useAccount } from 'wagmi';

const SubmitButton = ({ subject }: any) => {
  const { address, connector } = useAccount();

  const bucketName = 'ABC-' + String(subject) + address?.slice(-22);

  const { messages } = useContext(MessagesContext);

  const [info, setInfo] = useState<{
    objectName: string;
  }>({
    objectName: '',
  });

  async function SubmitSave() {
    // Your logic goes here
    console.log('Button clicked!', messages);

    if (!address) return;
    const spInfo = await selectSp();
    console.log('spInfo', spInfo);
    const provider = await connector?.getProvider();
    console.log(provider);
    const offChainData = await getOffchainAuthKeys(address, provider);
    if (!offChainData) {
      alert('No offchain, please create offchain pairs first');
      return;
    }

    try {
      const createBucketTx = await client.bucket.createBucket(
        {
          bucketName: bucketName,
          creator: address,
          visibility: 'VISIBILITY_TYPE_PUBLIC_READ',
          chargedReadQuota: '0',
          spInfo: {
            primarySpAddress: spInfo.primarySpAddress,
          },
          paymentAddress: address,
        },
        {
          type: 'EDDSA',
          domain: window.location.origin,
          seed: offChainData.seedString,
          address,
        }
      );

      const simulateInfo = await createBucketTx.simulate({
        denom: 'BNB',
      });

      console.log('simulateInfo', simulateInfo);

      const res = await createBucketTx.broadcast({
        denom: 'BNB',
        gasLimit: Number(simulateInfo?.gasLimit),
        gasPrice: simulateInfo?.gasPrice || '5000000000',
        payer: address,
        granter: '',
      });




      if (res.code === 0) {
        
        
        
        alert('success');
      }
    } catch (err) {
      console.log(typeof err);
      if (err instanceof Error) {
        alert(err.message);
      }
      if (err && typeof err === 'object') {
        alert(JSON.stringify(err));
      }
    }
  }

  return (
    <Button
      className='w-full mt-5 bg-[#F6D658] hover:opacity-70'
      onClick={SubmitSave}
    >
      Create Bucket Tx
    </Button>
  );
};

export default SubmitButton;
