import { client, selectSp } from "@/client";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui";
import { MessagesContext } from "@/context/messages";
import { getOffchainAuthKeys } from "@/utils/offchainAuth";
import { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { nanoid } from "nanoid";

const SubmitButton = ({ subject }: any) => {
  const { address, connector } = useAccount();
  const [loading, setIsloading] = useState(false);

  console.log(address, connector);

  let bucketName = String(subject) + "-" + nanoid().toLowerCase() + "-abc";
  while (bucketName.includes("_")) {
    bucketName = String(subject) + "-" + nanoid().toLowerCase() + "-abc";
  }

  const { messages, setIsBucketed, setBucketName } =
    useContext(MessagesContext);

  async function SubmitSave() {
    setIsloading(true);
    // Your logic goes here
    setBucketName(bucketName);
    console.log("Button clicked!", bucketName);

    if (!address) return alert("Please login first");
    const spInfo = await selectSp();
    //console.log('spInfo', spInfo);
    const provider = await connector?.getProvider();
    //console.log(provider);
    const offChainData = await getOffchainAuthKeys(address, provider);
    if (!offChainData) {
      alert("No offchain, please create offchain pairs first");
      return;
    }

    try {
      const createBucketTx = await client.bucket.createBucket(
        {
          bucketName: bucketName,
          creator: address,
          visibility: "VISIBILITY_TYPE_PUBLIC_READ",
          chargedReadQuota: "0",
          spInfo: {
            primarySpAddress: spInfo.primarySpAddress,
          },
          paymentAddress: address,
        },
        {
          type: "EDDSA",
          domain: window.location.origin,
          seed: offChainData.seedString,
          address,
        }
      );

      const simulateInfo = await createBucketTx.simulate({
        denom: "BNB",
      });

      console.log("simulateInfo", simulateInfo);
      const res = await createBucketTx.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo?.gasLimit),
        gasPrice: simulateInfo?.gasPrice || "5000000000",
        payer: address,
        granter: "",
      });

      if (res.code === 0) {
        alert("success");
        setIsBucketed(true);
      }
    } catch (err) {
      console.log(typeof err);
      if (err instanceof Error) {
        alert(err.message);
      }
      if (err && typeof err === "object") {
        // ! 이 부분에서 에러가 발생
        alert(JSON.stringify(err));
      }
    } finally {
      setIsloading(false);
    }
  }

  return (
    <Button
      className="w-full h-[50px] mt-5 bg-[#F6D658] hover:opacity-70 text-lg"
      onClick={SubmitSave}
    >
      {loading ? <Loader /> : "Create Bucket Tx"}
    </Button>
  );
};

export default SubmitButton;
