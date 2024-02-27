'use client';
import { buttonVariants } from '@/components/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex-col-center'>
      <h2>로그인에 문제가 발생했습니다.</h2>
      <Link href='/' className={buttonVariants({ variant: 'outline' })}>
        홈으로 돌아가기
      </Link>
    </main>
  );
}
