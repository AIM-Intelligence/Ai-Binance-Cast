import { multiFormatDateString } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import AgendaStats from './agenda-card-stats';
import AgendaCardMenu from '../menu/agenda-card-menu';
import shortenAddress from '@/utils/shortenAddress';

const AgendaCard = ({ agenda }: any) => {
  if (!agenda) return null;



  return (
    <div className='agenda-card'>
      <div className='flex-between'>
        <Link
          href={`/user/${agenda.creator.id}`}
          className='flex items-center gap-3'
        >
          <div>
            <Image
              src={agenda.creator.image_url || '/icons/profile-placeholder.svg'}
              alt='creator'
              width={50}
              height={50}
              className='w-[60px] h-[60px] rounded-full object-cover'
            />
          </div>

          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-black dark:text-light-1'>
              {shortenAddress(agenda.creator.address)}
            </p>
            <p className='subtle-semibold lg:small-regular text-dark-2 dark:text-light-2'>
              {multiFormatDateString(agenda.created_at)}
            </p>
          </div>
        </Link>

        <AgendaCardMenu />
      </div>

      <Link href={`/agenda/${agenda.id}`} onClick={() => {}}>
        <div className='small-medium lg:base-medium py-5'>
          <p className='text-2xl '>{agenda.title}</p>
          <ul className='flex gap-1 mt-2'>
            {agenda.tags.map((tag: string) => (
              <li key={tag} className='text-light-3'>
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={agenda.image_url || ''}
          alt='agenda image'
          width={300}
          height={300}
          className='agenda-card_img'
        />
      </Link>

      <AgendaStats agenda={agenda} />
    </div>
  );
};

export default AgendaCard;
