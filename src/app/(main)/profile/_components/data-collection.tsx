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

const test_data = [
  {
    agenda: 'Bitcoin 2024 Price Prediction',
    choosen: 'Bitcoin 2024 price will be $100,000',
    ai_words: 1098,
    creator_words: 804,
    bucket_url:
      'https://ai-binance-cast-market.vercel.app/#/resource?&bid=14330&address=0x61327612EC4aFD93e370eC0599f933bB08020A54&tab=dataList&from=%5B%7B%22path%22%3A%22%2F%22%2C%22name%22%3A%22Data%20MarketPlace%22%2C%22query%22%3A%22%22%7D%2C%7B%22path%22%3A%22%2Fprofile%22%2C%22name%22%3A%22My%20Collections%22%2C%22query%22%3A%22tab%3Dcollections%22%7D%5D&gid=1897',
    download_url: 'https://gnfd-testnet-sp3.bnbchain.org/download/bitcoina/ww',
    preview_url: 'https://gnfd-testnet-sp3.bnbchain.org/view/bitcoina/ww',
  },
  {
    agenda: 'Bitcoin 2024 Price Prediction',
    choosen: 'Bitcoin 2024 price will be $100,000',
    ai_words: 1098,
    creator_words: 804,
    bucket_url:
      'https://ai-binance-cast-market.vercel.app/#/resource?&bid=14330&address=0x61327612EC4aFD93e370eC0599f933bB08020A54&tab=dataList&from=%5B%7B%22path%22%3A%22%2F%22%2C%22name%22%3A%22Data%20MarketPlace%22%2C%22query%22%3A%22%22%7D%2C%7B%22path%22%3A%22%2Fprofile%22%2C%22name%22%3A%22My%20Collections%22%2C%22query%22%3A%22tab%3Dcollections%22%7D%5D&gid=1897',
    download_url: 'https://gnfd-testnet-sp3.bnbchain.org/download/bitcoina/ww',
    preview_url: 'https://gnfd-testnet-sp3.bnbchain.org/view/bitcoina/ww',
  },
  {
    agenda: 'Bitcoin 2024 Price Prediction',
    choosen: 'Bitcoin 2024 price will be $100,000',
    ai_words: 1098,
    creator_words: 804,
    bucket_url:
      'https://ai-binance-cast-market.vercel.app/#/resource?&bid=14330&address=0x61327612EC4aFD93e370eC0599f933bB08020A54&tab=dataList&from=%5B%7B%22path%22%3A%22%2F%22%2C%22name%22%3A%22Data%20MarketPlace%22%2C%22query%22%3A%22%22%7D%2C%7B%22path%22%3A%22%2Fprofile%22%2C%22name%22%3A%22My%20Collections%22%2C%22query%22%3A%22tab%3Dcollections%22%7D%5D&gid=1897',
    download_url: 'https://gnfd-testnet-sp3.bnbchain.org/download/bitcoina/ww',
    preview_url: 'https://gnfd-testnet-sp3.bnbchain.org/view/bitcoina/ww',
  },
];

export function DataCollection() {
  return (
    <section className='grid grid-cols-3 gap-4'>
      {test_data.map((data, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{data.agenda}</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 items-center justify-center'>
            <span>🟢 {data.choosen}</span>

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
          <CardFooter className='grid grid-cols-3 px-0 py-3'>
            <Link href={data.bucket_url} className='flex flex-col items-center justify-center gap-2'>
              <Archive />
              <p>Bucket</p>
            </Link>

            <Link href={data.download_url} className='flex flex-col items-center justify-center gap-2'>
              <Download />
              <p>Download</p>
            </Link>

            <Link href={data.preview_url} className='flex flex-col items-center justify-center gap-2'>
              <Presentation />
              <p>Preview</p>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
