'use client';

import { useState, useTransition } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '@/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { loginSchema } from '@/validation/auth';
import { AlertError } from '@/components/alerts/error-alert';
import Social from '../../app/auth/sign-up/_components/social';
import { AlertSuccess } from '@/components/alerts/success-alert';

export function SignInForm() {
  // isPending 말고 다른 걸로 대체하기
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {};

  const router = useRouter();

  return (
    <div className='grid gap-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='test@example.com'
                      type='email'
                      disabled={isPending}
                      className='shad-input'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='******'
                      type='password'
                      disabled={isPending}
                      className='shad-input'
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-5 '>
            {/* <AlertError message={error || urlError} /> */}
            {/* <AlertSuccess message={success} /> */}
            <Button
              disabled={isPending}
              className='shad-button_primary flex-1 mt-2'
              type='submit'
            >
              {isPending && (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              )}
              로그인
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
