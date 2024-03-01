import { createThirdwebClient } from 'thirdweb';

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error('No client ID provided');
}

const client = createThirdwebClient({
  secretKey: secretKey,
});
