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
import { UserButton } from '@clerk/nextjs';

const LeftSidebar = () => {
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

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link href='/' className='flex gap-3 items-center'>
          <Image src='/logo1.png' alt='logo' width={130} height={130} />
        </Link>

      

        <ul className='flex flex-col gap-6'>
        <UserButton afterSignOutUrl='/' />
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
        <ModeToggle />
      </div>
    </nav>
  );
};

export default LeftSidebar;
