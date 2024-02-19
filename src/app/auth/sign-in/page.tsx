import { Metadata } from 'next';
import Link from 'next/link';

import { UserRegisterForm } from '../../../components/forms/signup-form';

export const metadata: Metadata = {
  title: '회원가입',
};

const SignIn = () => {
  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[350px]'>
      <UserRegisterForm />
      <p className='text-center text-sm text-muted-foreground'>
        이미 회원가입을 하셨나요?
        <Link
          href='/sign-up'
          className='ml-2 underline underline-offset-4 hover:text-primary'
        >
          로그인하러 가기
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
