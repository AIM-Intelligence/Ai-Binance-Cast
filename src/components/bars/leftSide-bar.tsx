'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  SignInWithMetamaskButton,
  useClerk,
  useAuth,
} from '@clerk/nextjs';
import { Button } from '../ui/button';

import { sidebarLinks } from '@/constants/bar';
import { NavLink } from '@/types';

import { ModeToggle } from './components/theme-toggle';
import { Loader } from '../shared';
import { ConnectButton } from '@/lib/thirdweb/thirdweb';

import shortenAddress from '@/utils/shortenAddress';

const LeftSidebar = () => {
  const { isLoaded, userId } = useAuth();
  const { signOut } = useClerk();

  const { isSignedIn, user } = useUser();


  const pathname = usePathname();
  const router = useRouter();

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
        ) : isSignedIn ? (
          <SignedIn>
            <Button
              onClick={() => router.push('/profile')}
              className='flex items-center justify-start gap-2 '
            >
              <UserButton
                afterSignOutUrl='/'
                appearance={{
                  elements: {
                    avatarBox: 'h-[48px] w-[48px]',
                  },
                }}
              />
              <p>{shortenAddress(user?.primaryWeb3Wallet!.web3Wallet)}</p>
            </Button>
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
