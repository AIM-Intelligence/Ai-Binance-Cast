import { prepareTransaction, toWei } from "thirdweb";
import { client } from '../client-side';
import { chainId } from '../chainId';
 
const transaction = prepareTransaction({
  // the account that will be the receiver
  to: "0x456...",
  // the value is the amount of ether you want to send with the transaction
  value: toWei("1"),
  chain: chainId,
  client: client
});