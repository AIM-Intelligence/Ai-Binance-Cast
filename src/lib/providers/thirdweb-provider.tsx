'use client';

import { ThirdwebProvider } from 'thirdweb/react';
import { client } from '../thirdweb/client-side';

export default function ThirdwebProviderSet({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThirdwebProvider client={client}>{children}</ThirdwebProvider>;
}
