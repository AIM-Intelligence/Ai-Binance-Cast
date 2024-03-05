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

const test_data = [
  {
    agenda: 'Bitcoin 2024 Price Prediction',
    choosen: '🔴 Bitcoin 2024 price will be $30,000',
    ai_words: 1098,
    creator_words: 804,
    creator_address: '0x61327612EC4aFD93e370eC0599f933bB08020A54',
    creator_image:
      'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yY2FLRVFyd2puOUs2ZXV1aEd1YVBhUnFQWjIiLCJyaWQiOiJ1c2VyXzJkNG9ocDlBRzZiVW9KRnFlUVZLcVJSeHZiSyJ9',
    bucket_url:
      'https://ai-binance-cast-market.vercel.app/#/resource?&bid=14330&address=0x61327612EC4aFD93e370eC0599f933bB08020A54&tab=dataList&from=%5B%7B%22path%22%3A%22%2F%22%2C%22name%22%3A%22Data%20MarketPlace%22%2C%22query%22%3A%22%22%7D%2C%7B%22path%22%3A%22%2Fprofile%22%2C%22name%22%3A%22My%20Collections%22%2C%22query%22%3A%22tab%3Dcollections%22%7D%5D&gid=1897',
    download_url: 'https://gnfd-testnet-sp3.bnbchain.org/download/bitcoina/ww',
    preview_url:
      'https://gnfd-testnet-sp2.bnbchain.org/view/abcai-bitcoina54/bitcoin price 4',
  },
  {
    agenda: 'Bitcoin 2024 Price Prediction',
    choosen: '🟢 Bitcoin 2024 price will be $100,000',
    ai_words: 937,
    creator_words: 575,
    creator_address: '0xfE079EeC384A93457233720C76961EAC523897A0',
    creator_image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    bucket_url:
      'https://ai-binance-cast-market.vercel.app/#/resource?&bid=14330&address=0x61327612EC4aFD93e370eC0599f933bB08020A54&tab=dataList&from=%5B%7B%22path%22%3A%22%2F%22%2C%22name%22%3A%22Data%20MarketPlace%22%2C%22query%22%3A%22%22%7D%2C%7B%22path%22%3A%22%2Fprofile%22%2C%22name%22%3A%22My%20Collections%22%2C%22query%22%3A%22tab%3Dcollections%22%7D%5D&gid=1897',
    download_url: 'https://gnfd-testnet-sp3.bnbchain.org/download/bitcoina/ww',
    preview_url: 'https://gnfd-testnet-sp3.bnbchain.org/view/bitcoina/ww',
  },
];

const Purchases = () => {
  return (
    <section className='grid grid-cols-3 gap-4'>
      {test_data.map((data, index) => (
        <Card key={index}>
          <CardHeader className='cursor-pointer'>
            <div className='flex gap-4 items-center'>
              <Image
                src={data.creator_image}
                width={40}
                height={40}
                alt='address'
                className='rounded-full w-[40px] h-[40px] object-cover'
              />

              <span>{shortenAddress(data.creator_address)}</span>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 items-center justify-center'>
            <span className='text-lg text-center'>{data.agenda}</span>
            <span>{data.choosen}</span>

            <div className='grid grid-cols-2 gap-4 text-center'>
              <Card>
                <CardContent className='flex py-3 flex-col items-center justify-center'>
                  <p>AI</p>
                  <p>{data.ai_words}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='flex py-3 flex-col items-center justify-center'>
                  <p>Creator</p>
                  <p>{data.creator_words}</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <Separator className='bg-white' />
          <CardFooter className={cn('grid grid-cols-3 px-0 py-0 divide-x')}>
            <Link
              href={data.bucket_url}
              className='flex flex-col items-center justify-center gap-2 hover:bg-primary-500/50 py-2 rounded-bl-md '
            >
              <Archive />
              <p>Bucket</p>
            </Link>

            <Link
              href={data.download_url}
              className='flex flex-col items-center justify-center gap-2 hover:bg-primary-500/50 py-2 '
            >
              <Download />
              <p>Download</p>
            </Link>

            <Link
              href={data.preview_url}
              className='flex flex-col items-center justify-center gap-2 hover:bg-primary-500/50 py-2 rounded-br-md '
            >
              <Presentation />
              <p>Preview</p>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default Purchases;
