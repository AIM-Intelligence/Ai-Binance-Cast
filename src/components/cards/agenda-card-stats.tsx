'use client';
import useUpdateLikesServer from '@/hooks/useAgendas/useUpdateLikes';
import useUserServer from '@/hooks/useUser/useUserServer';
import { checkIsLiked } from '@/utils';
import { DEFAULT_LOGIN_PROBLEM_REDIRECT } from '@/routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

const AgendaStats = ({ agenda }: any) => {
  const router = useRouter();
  const agendaId = agenda.id;
  const numOfLikes = agenda.likes;

  const { data: user, error: userError } = useUserServer();

  const likesList = user.likes_list;

  const [likes, setLikes] = useState<string[]>(
    likesList === undefined ? [] : [...likesList]
  );
  const [numLikes, setNumLikes] = useState<number>(numOfLikes);

  const { mutate: updateLike, isPending } = useUpdateLikesServer(
    likes,
    agendaId,
    setLikes,
    setNumLikes
  );

  // export const updateLikeschema = z.object({
  //   agenda_id: z.string(),
  //   new_likes_list: z.string(),
  //   user_id: z.string(),
  // });

  if (userError) {
    router.replace(DEFAULT_LOGIN_PROBLEM_REDIRECT);
  }

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
            user.id &&
            updateLike({
              agenda_id: agenda.id,
              new_likes_list: [],
              user_id: user.id,
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
