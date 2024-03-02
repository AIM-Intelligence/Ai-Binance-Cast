'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';

import useUserClient from '@/hooks/useUser/useUserServer';
import { DEFAULT_LOGIN_PROBLEM_REDIRECT } from '@/routes';
import { useAuth, useUser } from '@clerk/nextjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StabBlockProps {
  value: string | number;
  label: string;
}

enum Type {
  Collections = 'collections',
  Purchase = 'purchase',
}
const _navItems = [
  {
    name: 'My Data Collections',
    key: Type.Collections,
  },
  {
    name: 'My Purchases',
    key: Type.Purchase,
  },
];



const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className='flex-center gap-2'>
    <p className='small-semibold lg:body-bold text-primary-500'>{value}</p>
    <p className='small-medium lg:base-medium text-black dark:text-light-2'>
      {label}
    </p>
  </div>
);

const Profile = () => {
  const { user: user_address } = useUser();


  const { isFetching, data: user, error } = useUserClient();

  const searchParams = useSearchParams();

  const router = useRouter();

  const search = searchParams.get('/');

  if (isFetching) {
    return (
      <div className='isfetching-flex'>
        <Loader />
      </div>
    );
  }

  return (
    <main className='profile-container'>
      <div className='profile-inner_container'>
        <div className='flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7'>
          <Image
            src={user[0]?.image_url || '/icons/profile-placeholder.svg'}
            alt='profile'
            width={50}
            height={50}
            className='w-[80px] h-[80px] object-cover rounded-full'
          />
          <div className='flex flex-col flex-1 justify-between md:mt-2'>
            <div className='flex flex-col w-full'>
              <h1 className='text-center xl:text-left h3-bold md:h1-semibold w-full'>
                {user[0]?.display_name}
              </h1>
              <p className='small-regular md:body-medium text-light-3 text-center xl:text-left'>
                {user[0]?.address}
              </p>
            </div>

            <div className='flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20'>
              <StatBlock value={user[0].age ? user.age : '-'} label='나이' />
              <StatBlock
                value={user[0].gender ? user.gender : '-'}
                label='성별'
              />
              <StatBlock
                value={user[0].point ? user.point : '-'}
                label='포인트'
              />
              <StatBlock
                value={user[0].token ? user.token : '-'}
                label='토큰'
              />
              <StatBlock
                value={user[0].coupon ? user.coupon : '-'}
                label='쿠폰'
              />
            </div>

            <p className='small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm'>
              user bio....
            </p>
          </div>

          <div className='flex justify-center gap-4'>
            <Link
              href={`#`}
              className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg`}
            >
              <Image
                src={'/icons/edit.svg'}
                alt='edit'
                width={20}
                height={20}
              />
              <p className='flex whitespace-nowrap small-medium'>
                Edit Profile
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className='flex max-w-5xl w-full'>
        <Link
          href={`/profile/`}
          className={`profile-tab rounded-l-lg ${
            search === `#` && '!bg-dark-3'
          }`}
        >
          <Image src={'/icons/posts.svg'} alt='posts' width={20} height={20} />
          My Data Collections
        </Link>
        <Link
          href={`#`}
          className={`profile-tab rounded-r-lg ${
            search === `#` && '!bg-dark-3'
          }`}
        >
          <Image src={'/icons/like.svg'} alt='like' width={20} height={20} />
          My Purchases
        </Link>
      </div>

     
    </main>
  );
};

export default Profile;
