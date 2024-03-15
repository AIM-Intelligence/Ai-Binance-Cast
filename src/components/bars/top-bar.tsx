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
import useUserClient from '@/hooks/useUser/useUserServer';
import { Loader } from '../shared';
import { ModeToggle } from './components/theme-toggle';
import {
  SignInWithMetamaskButton,
  SignedOut,
  useClerk,
  useUser,
} from '@clerk/nextjs';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';

const Topbar = () => {
  const { isSignedIn, user: user_address } = useUser();
  const userAddress = user_address?.primaryWeb3Wallet!.web3Wallet;
  const { isFetching, data: user, error } = useUserClient();
  const { signOut } = useClerk();

  const { connectors, connect } = useConnect();

  const { address } = useAccount();

  const { disconnect } = useDisconnect();
  const connector = connectors[0];

  const {
    data: token,
    isError: tokenError,
    isLoading,
  } = useBalance({
    address: address,
    token: '0x3e38a6aC5F4990B76440Ec54189628ae123EEb7d',
    // onError(error) {
    //   console.log('Error', error);
    // },
  });

  const { data: coin, isError: coinError } = useBalance({
    address: address,
    // onError(error) {
    //   console.log('Error', error);
    // },
  });

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  if (isFetching) {
    return (
      <div className='topbar'>
        <Loader />
        <Button onClick={() => router.refresh()}>Refresh</Button>
      </div>
    );
  }

  if (error) {
    <div className='topbar'>
      <Button onClick={() => router.refresh()}>Refresh</Button>
    </div>;
  }

  return (
    <section className='topbar'>
      <div className='flex-between px-5'>
        <Link href='/' className='flex gap-3 items-center'>
          <Image
            src='/abcLogo.png'
            alt='logo'
            width={60}
            height={60}
            className='text-black hidden dark:flex'
          />
          <Image
            src='/abcLogo.png'
            alt='logo'
            width={60}
            height={60}
            className='text-black dark:hidden'
          />
        </Link>

        <div className='flex gap-4'>
          <ModeToggle />

          {user && user[0]?.id ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Link href='/profile' className='flex-center gap-3'>
                  <Image
                    src={
                      user[0].image_url
                        ? user[0].image_url
                        : '/icons/profile-placeholder.svg'
                    }
                    alt='profile'
                    width={40}
                    height={40}
                    className='rounded-full w-[40px] h-[40px] object-cover'
                  />
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white dark:bg-black'>
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  MyPage
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/explore')}>
                  What is ABC?
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    disconnect();
                    signOut(() => router.push('/'));
                  }}
                  disabled={isPending}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignedOut>
              <SignInWithMetamaskButton>
                <button
                  className='relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md'
                  onClick={() => connect({ connector })}
                >
                  <span className='w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute'></span>
                  <span className='relative w-full py-3 text-center transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400'>
                    <span className='relative text-white'>
                      Sign with metamask
                    </span>
                  </span>
                </button>
              </SignInWithMetamaskButton>
            </SignedOut>
          )}
        </div>
      </div>
    </section>
  );
};

export default Topbar;
