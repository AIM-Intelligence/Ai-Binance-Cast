'use client';
import { Button, buttonVariants } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <main className='flex-col-center'>
      <h2>존재하지 않은 페이지 입니다.</h2>

      <Button variant='outline' onClick={() => router.refresh()}>
        Refresh
      </Button>
    </main>
  );
}
