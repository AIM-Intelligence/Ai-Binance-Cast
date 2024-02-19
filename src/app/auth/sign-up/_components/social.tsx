'use client';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { RiKakaoTalkLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icons';

// import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { useSearchParams } from 'next/navigation';
import { createClientBrowser } from '@/lib/supabase/browser';
import { useTransition } from 'react';

const Social = () => {
  const [isPending, startTransition] = useTransition();
  const params = useSearchParams();

  const next = params.get('next');

  const handleLoginWithOAuth = (provider: 'kakao') => {
    startTransition(async () => {
      const supabase = createClientBrowser();

      await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: location.origin + '/auth/callback?next=',
        },
      });
    });
  };

  // '/auth/callback?next/'

  return (
    <div className='flex flex-col gap-4'>
      <Button
        variant='outline'
        className=' rounded-md text-lg'
        type='button'
        disabled={isPending}
        onClick={() => handleLoginWithOAuth('kakao')}
      >
        {isPending ? (
          <Icons.spinner className='mr-3 h-6 w-6 animate-spin' />
        ) : (
          <>
            <RiKakaoTalkFill
              fill='#FEE500'
              className='mr-3 h-7 w-7 hidden dark:flex'
            />
            <RiKakaoTalkLine fill='#000' className='dark:hidden mr-3 h-7 w-7' />
          </>
        )}
        Kakao
      </Button>
    </div>
  );
};

export default Social;
