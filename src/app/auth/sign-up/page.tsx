import { Metadata } from 'next';

import { SignInForm } from '../../../components/forms/signin-form';
import Image from 'next/image';
import Social from './_components/social';
import Link from 'next/link';
import { Suspense } from 'react';
import Loader from '@/components/shared/Loader';
import Gohome from '@/components/shared/go-home';

export const metadata: Metadata = {
  title: 'login',
};

export default function AuthenticationPage() {
  return (
    <div className='mx-auto flex w-full flex-col justify-center sm:w-[350px] text-center -mt-28'>
      <Link href='/'>
        <Image
          src='/logo2-white.svg'
          alt='logo'
          width={300}
          height={100}
          className='hidden dark:flex'
        />
        <Image
          src='/logo2-black.svg'
          alt='logo'
          width={300}
          height={100}
          className='dark:hidden'
        />
      </Link>

      {/* <SignInForm />

      <div className='grid grid-cols-2 text-center gap-8 text-sm text-muted-foreground '>
        <Link
          href='/sign-in'
          className='underline underline-offset-4 hover:text-primary '
        >
          회원가입
        </Link>

        <Link
          href='/auth/reset'
          className='underline underline-offset-4 hover:text-primary '
        >
          아이디/비밀번호 찾기
        </Link>
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-sm uppercase'>
          <p className='bg-dark-1 px-2 text-muted-foreground'>또는</p>
        </div>
      </div> */}
      {/* check this for suspense :  https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}

      <div className='space-y-4'>


      <Suspense fallback={<Loader />}>
        <Social />
      </Suspense>

      <Gohome />
      </div>
    </div>
  );
}
