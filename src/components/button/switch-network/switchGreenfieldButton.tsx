import { Loader } from "@/components/shared";
import { Button } from "@/components/ui";
import { GREEN_CHAIN_ID } from "@/config/env";
import { useSwitchChain } from "wagmi";

const SwitchGreenfieldButton = () => {
  const { error, isPending, chains, switchChain } = useSwitchChain();

  return (
    <div>
      <Button
        onClick={() => {
          switchChain({ chainId: GREEN_CHAIN_ID });
        }}
        className="w-full h-[50px] mt-5 bg-[#5ed550] hover:opacity-70 text-lg"
      >
        {isPending ? <Loader /> : "Switch to Greenfield Testnet"}
      </Button>
    </div>
  );
};

export default SwitchGreenfieldButton;
