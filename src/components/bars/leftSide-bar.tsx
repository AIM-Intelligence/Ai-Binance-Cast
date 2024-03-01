'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, redirect } from 'next/navigation';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { Button } from '../ui/button';
import { createClientBrowser, supabaseClient } from '@/lib/supabase/browser';
import { sidebarLinks } from '@/constants/bar';
import { NavLink } from '@/types';

import { DEFAULT_LOGIN_PROBLEM_REDIRECT } from '@/routes';
import useUserServer from '@/hooks/useUser/useUserServer';
import { ModeToggle } from './components/theme-toggle';
import { Loader } from '../shared';
import { useAuth } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { SignInWithMetamaskButton, useClerk } from '@clerk/nextjs';
import shortenAddress from '@/utils/shortenAddress';

const LeftSidebar = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { signOut } = useClerk();

  const { isSignedIn, user } = useUser();
  
  console.log(isSignedIn);
  console.log(user?.primaryWeb3Wallet!.web3Wallet);

  const pathname = usePathname();
  const router = useRouter();
 
  const loginData = async () => {
    // TODO #1: Replace with your JWT template name
    const supabaseAccessToken = await getToken({ template: 'supabase' });
 
    const supabase = await supabaseClient(supabaseAccessToken);
    
    // TODO #2: Replace with your database table name
    
    const { data, error } = await supabase.from('your_table').select();
 
    // TODO #3: Handle the response
  };




  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link href='/' className='flex gap-3 items-center'>
          <Image
            src='/abcLogo.png'
            alt='logo'
            width={120}
            height={100}
            className='text-black hidden dark:flex'
          />
          <Image
            src='/abcLogo.png'
            alt='logo'
            width={120}
            height={100}
            className='text-black dark:hidden'
          />
        </Link>

        {!isLoaded ? (
          <div>
            <Loader />
          </div>
        ) : userId ? (
          <SignedIn>
            <div className='flex items-center gap-2 '>
              <UserButton
                afterSignOutUrl='/'
                appearance={{
                  elements: {
                    avatarBox: 'h-[48px] w-[48px]',
                  },
                }}
              />
              <p>{shortenAddress(user?.primaryWeb3Wallet!.web3Wallet)}</p>
            </div>
          </SignedIn>
        ) : (
          <SignedOut>
            <SignInWithMetamaskButton>
              <Button
                variant='outline'
                className='border border-black hover:bg-slate-500'
              >
                Sign in
              </Button>
            </SignInWithMetamaskButton>
            {/* <SignInButton>
              <Button
                variant='outline'
                className='border border-black hover:bg-slate-500'
              >
                Sign in
              </Button>
            </SignInButton> */}
          </SignedOut>
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
        {userId && (
          <Button
            variant='ghost'
            className='shad-button_ghost hover:opacity-70'
            onClick={() => signOut(() => router.push('/'))}
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
