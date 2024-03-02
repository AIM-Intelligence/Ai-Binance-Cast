'use client';
import useUpdateLikesServer from '@/hooks/useAgendas/useUpdateLikes';
import useUserClient from '@/hooks/useUser/useUserServer';
import { checkIsLiked } from '@/utils';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

import { useState } from 'react';

const AgendaStats = ({ agenda }: any) => {
  const agendaId = agenda.id;
  const numOfLikes = agenda.likes;
  const { isSignedIn, user : user_address } = useUser();
  const userAddress = user_address?.primaryWeb3Wallet!.web3Wallet
  const { data: user, error: userError } = useUserClient();

  const likesList = user && user[0]?.likes_list;

  

  const [likes, setLikes] = useState<string[]>(
    likesList === null || likesList === undefined ? [] : [...likesList]
  );
  const [numLikes, setNumLikes] = useState<number>(numOfLikes);

  const { mutate: updateLike, isPending } = useUpdateLikesServer(
    likes,
    agendaId,
    setLikes,
    setNumLikes
  );

  //! user.id 가 없으면 누를 수 없는 그림으로 변경
  return (
    <div className='flex justify-between items-center z-20'>
      <div className='flex gap-2 mr-5 items-center'>
        <Image
          src={`${
            checkIsLiked(likes, agenda.id)
              ? '/icons/liked.svg'
              : '/icons/like.svg'
          }`}
          alt='liked'
          width={25}
          height={25}
          onClick={() =>
            user && user[0]?.address &&
            updateLike({
              agenda_id: agenda.id,
              new_likes_list: [],
              user_id: user[0].id,
              plus_check: true,
            })
          }
          className='cursor-pointer'
        />
        <p className='small-medium lg:base-medium'>{numLikes}</p>
      </div>

      <div className='flex gap-2 items-center'>
        <Image
          src='/icons/user-add.svg'
          alt='participants'
          width={25}
          height={25}
          className='dark:invert-white'
        />
        <p className='small-medium lg:base-medium'>{agenda.participants}</p>
      </div>

      <div className='flex gap-2 items-center'>
        <Image
          src='/icons/eye.svg'
          alt='views'
          width={25}
          height={25}
          className='dark:invert-white'
        />
        <p className='small-medium lg:base-medium'>{agenda.views}</p>
      </div>

      <div className='flex gap-2 items-center'>
        <Image
          src='/icons/messages.svg'
          alt='words'
          width={25}
          height={25}
          className='dark:invert-white'
        />
        <p className='small-medium lg:base-medium'>
          {agenda.agree_words + agenda.disagree_words}
        </p>
      </div>

      <div className='flex gap-2 items-center'>
        <Image
          src='/icons/checkbox.svg'
          alt='check'
          width={25}
          height={25}
          className='dark:invert-white'
        />
      </div>
    </div>
  );
};

export default AgendaStats;
