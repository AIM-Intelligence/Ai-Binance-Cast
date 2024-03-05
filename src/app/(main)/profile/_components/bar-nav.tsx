'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils';
import { buttonVariants } from '@/components/ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function BarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-wrap  py-2', className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'rounded-none px-6 py-2',

            pathname === item.href
              ? 'hover:bg-muted text-primary-500 border:1px border-primary-500 border'
              : 'hover:bg-transparent hover:underline hover:decoration-primary-500 border-primary-600 border',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
