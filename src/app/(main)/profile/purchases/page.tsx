'use client';

import { Download } from 'lucide-react';
import { Archive } from 'lucide-react';
import { Presentation } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { cn } from '@/utils';
import Image from 'next/image';
import shortenAddress from '@/utils/shortenAddress';

const Purchases = () => {
  return <section className='grid grid-cols-3 gap-4'></section>;
};

export default Purchases;
