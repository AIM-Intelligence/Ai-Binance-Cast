'use client';
import Image from 'next/image';
import Link from 'next/link';

import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';

import { useAction } from 'next-safe-action/hooks';
import { getOtherUserServer } from '../../../../../server/actions/auth-actions/read/other-user';
import { useEffect } from 'react';

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className='flex-center gap-2'>
    <p className='small-semibold lg:body-bold text-primary-500'>{value}</p>
    <p className='small-medium lg:base-medium'>{label}</p>
  </div>
);

const Profile = ({ params }: { params: { id: string } }) => {
  const { execute, status, result } = useAction(getOtherUserServer);

  useEffect(() => {
    execute({ id: params.id });
  }, []);

  const other_user: any = result.data;

  if (status === 'executing' || status === 'idle') {
    return (
      <div className='isfetching-flex'>
        <Loader />
      </div>
    );
  }

  if (result.fetchError || result.serverError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!other_user) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <div className='flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7'>
          <Image
            src={other_user.image_url || '/icons/profile-placeholder.svg'}
            alt='profile'
            width={50}
            height={50}
            className='w-[80px] h-[80px] object-cover rounded-full'
          />
          <div className='flex flex-col flex-1 justify-between md:mt-2'>
            <div className='flex flex-col w-full'>
              <p className='small-regular md:text-2xl text-center xl:text-left'>
                {other_user.address}
              </p>
              <span className='flex gap-2 items-center'>
                <Image
                  src='/abcLogo.png'
                  width={40}
                  height={40}
                  alt='abc token'
                />
                <p className='small-regular md:body-medium text-center xl:text-left text-primary-500'>
                  ABC Token : 1000
                </p>
              </span>
            </div>

            <div className='flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20'>
              <StatBlock
                value={other_user.age ? other_user.age : '-'}
                label='age'
              />
              <StatBlock
                value={other_user.gender ? other_user.gender : '-'}
                label='gender'
              />
              <StatBlock
                value={other_user.point ? other_user.point : '-'}
                label='point'
              />
              <StatBlock
                value={other_user.token ? other_user.token : '-'}
                label='token'
              />
              <StatBlock
                value={other_user.coupon ? other_user.coupon : '-'}
                label='coupon'
              />
            </div>

            <p className='small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm'>
              user bio....
            </p>
          </div>

          <div className='flex justify-center gap-4'>
            <Button type='button' className='shad-button_primary px-8'>
              Follow
            </Button>
          </div>
        </div>
      </div>

      <div className='flex max-w-5xl w-full'>
        <Link href={`#`} className='profile-tab rounded-l-lg'>
          <Image src={'/icons/posts.svg'} alt='posts' width={20} height={20} />
          Data Collections
        </Link>
        <Link href={`#`} className='profile-tab rounded-r-lg'>
          <Image src={'/icons/like.svg'} alt='like' width={20} height={20} />
          Purchases
        </Link>
      </div>
    </div>
  );
};

export default Profile;
