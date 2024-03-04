import { useContract, useContractWrite } from "@thirdweb-dev/react";

const SubmitChat = ({ agenda }: any) => {
  const { contract } = useContract(
    "0x3e38a6aC5F4990B76440Ec54189628ae123EEb7d",
  );
  const { mutateAsync: transfer, isLoading } = useContractWrite(
    contract,
    "transfer",
  );

  const from = "0xcD0bb2F13ee6A6d51894128dB35981814397d8D4";
  const to = "0xf49D12bFBe7e0e89Af2d77faefF57E22495ee958";
  const amount = 5;

  const call = async () => {
    try {
      const data = await transfer({ args: [to, amount] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <div>
      <p>hello</p>
      <button onClick={call} disabled={isLoading}>call</button>
    </div>
  );
};

export default SubmitChat;
