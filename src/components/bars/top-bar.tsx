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

 
  return (
    <section className='topbar'>
      <div className='flex-between px-5 py-2'>
        <Link href='/' className='flex gap-3 items-center'>
          <Image src='/logo1.png' alt='logo' width={60} height={60} />
        </Link>

        <div className='flex gap-4'>
          <ModeToggle />
         
        </div>
      </div>
    </section>
  );
};

export default Topbar;
