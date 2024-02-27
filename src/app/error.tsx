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
      <h2>서버에서 에러가 발생되었습니다.</h2>
      <Button variant='outline' onClick={() => router.refresh()}>
        새로고침
      </Button>
    </main>
  );
}
