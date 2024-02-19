'use client';
import { useTransition } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '../ui/button';
import { createClientBrowser } from '@/lib/supabase/browser';
import { redirect, useRouter } from 'next/navigation';
import { DEFAULT_LOGIN_PROBLEM_REDIRECT } from '@/routes';
import useUserServer from '@/hooks/useUser/useUserServer';
import { Loader } from '../shared';
import { ModeToggle } from './components/theme-toggle';

const Topbar = () => {
  const { isFetching, data: user, error } = useUserServer();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleLogoutWithOAuth = () => {
    startTransition(async () => {
      const supabase = createClientBrowser();

      const { error } = await supabase.auth.signOut();

      if (!error) {
        redirect(DEFAULT_LOGIN_PROBLEM_REDIRECT);
      }
    });
  };

  if (isFetching) {
    return (
      <div className='topbar'>
        <Loader />
        <Button onClick={() => router.refresh()}>새로고침</Button>
      </div>
    );
  }

  if (error) {
    <div className='topbar'>
      <Button onClick={() => router.refresh()}>새로고침</Button>
    </div>;
  }

  return (
    <section className='topbar'>
      <div className='flex-between px-5'>
        <Link href='/' className='flex gap-3 items-center'>
          <Image
            src='/logo1-white.svg'
            alt='logo'
            width={60}
            height={60}
            className='text-black hidden dark:flex'
          />
          <Image
            src='/logo1-black.svg'
            alt='logo'
            width={60}
            height={60}
            className='text-black dark:hidden'
          />
        </Link>

        <div className='flex gap-4'>
        <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Link href='/profile' className='flex-center gap-3'>
                <Image
                  src={
                    user.image_url
                      ? user.image_url
                      : '/icons/profile-placeholder.svg'
                  }
                  alt='profile'
                  width={40}
                  height={40}
                  className='rounded-full w-[40px] h-[40px] object-cover'
                />
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white'>
              <DropdownMenuItem>마이페이지</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/ai-chat-market')}>
                AI 대변인이란
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleLogoutWithOAuth()}
                disabled={isPending}
              >
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
