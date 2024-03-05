'use client'; // Error components must be Client Components

import { Button, buttonVariants } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <main className='flex-col-center'>
      <h2>An error occurred on the server.</h2>
      <Button variant='outline' onClick={() => router.refresh()}>
        Refresh
      </Button>
    </main>
  );
}
