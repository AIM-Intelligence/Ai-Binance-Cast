import { client, selectSp } from "@/client";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui";
import { MessagesContext } from "@/context/messages";
import { getOffchainAuthKeys } from "@/utils/offchainAuth";
import { ReedSolomon } from "@bnb-chain/reed-solomon";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const StorageButton = ({ subject }: any) => {
  const { address, connector } = useAccount();
  const [loading, setIsloading] = useState(false);

  const router = useRouter();

  //const bucketName = String(subject) + nanoid().toLowerCase() + '-abc';

  const { messages, bucketName } = useContext(MessagesContext);

  const [info, setInfo] = useState<{
    objectName: string;
  }>({
    objectName: "bitcoin price",
  });

  async function SubmitSave() {
    setIsloading(true);

    {
      /* create file */
    }
    const chatObject = { chat: messages };
    // JSON 객체를 문자열로 변환
    const jsonString = JSON.stringify(chatObject);
    // 문자열을 Blob으로 변환
    const blob = new Blob([jsonString], {
      type: "application/json",
    });
    // Blob을 File 객체로 변환
    const file = new File([blob], subject, {
      type: "application/json",
    });
    alert("File Created");

    {
      /* create object */
    }
    if (!address || !file) return;

    const spInfo = await selectSp();
    console.log("spInfo", spInfo);

    const provider = await connector?.getProvider();
    const offChainData = await getOffchainAuthKeys(address, provider);
    if (!offChainData) {
      alert("No offchain, please create offchain pairs first");
      return;
    }

    const rs = new ReedSolomon();
    const fileBytes = await file.arrayBuffer();
    const expectCheckSums = rs.encode(new Uint8Array(fileBytes));

    try {
      const createObjectTx = await client.object.createObject(
        {
          bucketName: bucketName,
          objectName: info.objectName,
          creator: address,
          visibility: "VISIBILITY_TYPE_PRIVATE",
          fileType: file.type,
          redundancyType: "REDUNDANCY_EC_TYPE",
          contentLength: fileBytes.byteLength,
          expectCheckSums: expectCheckSums,
        },
        {
          type: "EDDSA",
          domain: window.location.origin,
          seed: offChainData.seedString,
          address,
        }
      );

      const simulateInfo = await createObjectTx.simulate({
        denom: "BNB",
      });

      console.log("simulateInfo", simulateInfo);

      const res = await createObjectTx.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo?.gasLimit),
        gasPrice: simulateInfo?.gasPrice || "5000000000",
        payer: address,
        granter: "",
      });

      if (res.code === 0) {
        const txnHash = res.transactionHash;
        alert("create object success");

        {
          /* upload */
        }
        const uploadRes = await client.object.uploadObject(
          {
            bucketName: bucketName,
            objectName: info.objectName,
            body: file,
            txnHash: txnHash,
          },
          {
            type: "EDDSA",
            domain: window.location.origin,
            seed: offChainData.seedString,
            address,
          }
        );

        console.log("uploadRes", uploadRes);

        if (uploadRes.code === 0) {
          alert("upload success");

          const tokenAddress = process.env.NEXT_PUBLIC_ABC_TOKEN_ADDRESS!;
          const transferAbi = ["function transfer (address to, uint amount)"];
          const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY!;
          const RpcHttpUrl = "wss://bsc-testnet-rpc.publicnode.com";

          const provider = ethers.getDefaultProvider(RpcHttpUrl);
          const hexPrivateKey = Buffer.from(privateKey, "hex");
          const signer = new ethers.Wallet(hexPrivateKey, provider);

          const tokenContract = new ethers.Contract(
            tokenAddress,
            transferAbi,
            provider
          );
          const tokenSigner = tokenContract.connect(signer);

          const tokenAmount = ethers.utils.parseUnits("3.0", 18);
          const transaction = await tokenSigner.transfer(address, tokenAmount);
          console.log("token transfer hash: ", transaction.hash);

          alert(`3 ABC tokens transferred to ${address}`);

          router.push("https://ai-binance-cast-market.vercel.app");
        }
      }
    } catch (err) {
      console.log(typeof err);
      if (err instanceof Error) {
        alert(err.message);
      }
      if (err && typeof err === "object") {
        alert(JSON.stringify(err));
      }
    } finally {
      setIsloading(false);
    }
  }

  return (
    <Button
      className="w-full h-[50px] mt-5 bg-[#5ed550] hover:opacity-70 text-lg"
      onClick={SubmitSave}
    >
      {loading ? <Loader /> : "Upload to Greenfield"}
    </Button>
  );
};

export default StorageButton;
