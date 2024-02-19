'use client';
import { buttonVariants } from '@/components/ui';
import { cn } from '@/utils';
import Link from 'next/link';

const Gohome = () => {
  return (
    <Link
      href='/'
      className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
    >
      홈으로 돌아가기
    </Link>
  );
};

export default Gohome;
