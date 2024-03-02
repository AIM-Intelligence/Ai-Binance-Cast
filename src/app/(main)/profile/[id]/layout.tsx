'use client';
import { Loader } from '@/components/shared';
import { Suspense } from 'react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
