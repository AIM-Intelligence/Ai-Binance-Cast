'use client';
import { useTransition } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, redirect } from 'next/navigation';

import { Button } from '../ui/button';
import { createClientBrowser } from '@/lib/supabase/browser';
import { sidebarLinks } from '@/constants/bar';
import { NavLink } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { DEFAULT_LOGIN_PROBLEM_REDIRECT } from '@/routes';
import useUserServer from '@/hooks/useUser/useUserServer';
import { ModeToggle } from './components/theme-toggle';
import { Loader } from '../shared';

const LeftSidebar = () => {
  const { isFetching, data: user, error } = useUserServer();

  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleLogoutWithOAuth = () => {
    startTransition(async () => {
      const supabase = createClientBrowser();
      queryClient.clear();
      const { error } = await supabase.auth.signOut();

      if (!error) {
        redirect(DEFAULT_LOGIN_PROBLEM_REDIRECT);
      }

      router.refresh();
    });
  };

  if (isFetching) {
    return (
      <div className='leftsidebar'>
        <Loader />
        <Button onClick={() => router.refresh()}>새로고침</Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className='leftsidebar'>
        <Button onClick={() => router.refresh()}>새로고침</Button>
      </div>
    );
  }

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link href='/' className='flex gap-3 items-center'>
          <Image
            src='/logo1-white.svg'
            alt='logo'
            width={120}
            height={100}
            className='text-black hidden dark:flex'
          />
          <Image
            src='/logo1-black.svg'
            alt='logo'
            width={120}
            height={100}
            className='text-black dark:hidden'
          />
        </Link>

        {user.id ? (
          <Link href='/profile' className='flex gap-3 items-center'>
            <Image
              src={user.image_url || '/icons/profile-placeholder.svg'}
              alt='profile'
              width={50}
              height={50}
              className='rounded-full w-[60px] h-[60px] object-cover'
            />

            <div className='flex flex-col'>
              <p className='body-bold'>{user.display_name}</p>
              <p className='small-regular text-light-3'>{user.email}</p>
            </div>
          </Link>
        ) : (
          <div className='flex items-center'>
            <Button
              onClick={() => router.push('/auth/sign-up')}
              className='border-2 border-black w-full'
            >
              로그인
            </Button>
          </div>
        )}

        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: NavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}
              >
                <Link
                  href={link.route}
                  className={`flex gap-4 items-center p-4 hover:text-white ${
                    isActive && 'text-white'
                  }`}
                >
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                    width={30}
                    height={30}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex-between gap-4'>
        {user.id && (
          <Button
            variant='ghost'
            className='shad-button_ghost hover:opacity-70'
            onClick={() => handleLogoutWithOAuth()}
            disabled={isPending}
          >
            <Image
              src='/icons/sign-out-alt.svg'
              alt='logout'
              width={30}
              height={30}
            />
            <p className='small-medium lg:base-medium'>로그아웃</p>
          </Button>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
};

export default LeftSidebar;
