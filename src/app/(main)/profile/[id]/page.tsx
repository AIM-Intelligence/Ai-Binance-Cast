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
    return <Loader />;
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
              <h1 className='text-center xl:text-left h3-bold md:h1-semibold w-full'>
                {other_user.display_name}
              </h1>
              <p className='small-regular md:body-medium text-light-3 text-center xl:text-left'>
                {other_user.email}
              </p>
            </div>

            <div className='flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20'>
              <StatBlock
                value={other_user.age ? other_user.age : '-'}
                label='나이'
              />
              <StatBlock
                value={other_user.gender ? other_user.gender : '-'}
                label='성별'
              />
              <StatBlock
                value={other_user.point ? other_user.point : '-'}
                label='포인트'
              />
              <StatBlock
                value={other_user.token ? other_user.token : '-'}
                label='토큰'
              />
              <StatBlock
                value={other_user.coupon ? other_user.coupon : '-'}
                label='쿠폰'
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
          Posts
        </Link>
        <Link href={`#`} className='profile-tab rounded-r-lg'>
          <Image src={'/icons/like.svg'} alt='like' width={20} height={20} />
          Liked Posts
        </Link>
      </div>
    </div>
  );
};

export default Profile;
