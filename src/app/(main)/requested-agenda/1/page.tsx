'use client';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { cn, multiFormatDateString } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import AgendaDetailCardMenu from '@/components/menu/agenda-detail-card-menu';
import shortenAddress from '@/utils/shortenAddress';

import { Progress } from '@/components/ui/progress';
const agendaDetail = {
  creator: {
    id: 'weofkw',
    image_url:
      'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yY2FLRVFyd2puOUs2ZXV1aEd1YVBhUnFQWjIiLCJyaWQiOiJ1c2VyXzJkNG9ocDlBRzZiVW9KRnFlUVZLcVJSeHZiSyJ9',
    address: '0x65CAFeFA9cb3bA556Efd416fE4281F2Ee30BB36b',
  },
  id: '1',
  title: 'Test',
  image_url:
    'https://fhifmdvolxqfufqlrprk.supabase.co/storage/v1/object/public/images/3f999b0c-de99-495d-b9bc-634eb7ef4c47.png',
  content_detail: 'wef',
  content: ['test1', 'test2', 'test3'],
};

const AgendaChoose = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();

  return (
    <div className='agenda_details-container'>
      <div className='hidden max-w-5xl md:flex w-full '>
        <Button
          onClick={() => router.push('/')}
          variant='ghost'
          className='shad-button_ghost'
        >
          <Image src={'/icons/back.svg'} alt='back' width={24} height={24} />
          <p className='small-medium lg:base-medium'>Back</p>
        </Button>
      </div>

      <div className='agenda_details-card'>
        <Image
          src={agendaDetail.image_url || ''}
          alt='creator'
          className='agenda_details-img'
          width={400}
          height={400}
        />

        <div className='agenda_details-info'>
          <div className='flex-between w-full'>
            <Link
              href={`/profile/${agendaDetail.creator.id}`}
              className='flex items-center gap-3'
            >
              <Image
                src={
                  agendaDetail.creator.image_url ||
                  '/icons/profile-placeholder.svg'
                }
                alt='creator'
                width={50}
                height={50}
                className='w-8 h-8 lg:w-12 lg:h-12 rounded-full'
              />
              <div className='flex gap-1 flex-col'>
                <p className='base-medium lg:body-bold'>
                  {shortenAddress(agendaDetail.creator.address)}
                </p>
                <div className='flex-start gap-2 text-light-3'>
                  <p className='subtle-semibold lg:small-regular '>Just now</p>
                </div>
              </div>
            </Link>

            <div className='flex-center gap-4'>
              <AgendaDetailCardMenu
                detailContent={agendaDetail.content_detail}
              />
            </div>
          </div>

          <hr className='border w-full border-dark-4/80' />

          <div className='flex  flex-col flex-wrap  flex-1 w-full lg:base-regular'>
            <ul className='mt-2 my-6 ml-4 list-disc [&>li]:mt-2 flex flex-col justify-around flex-1'>
              {agendaDetail.content.map((content: any, index: any) => (
                <li key={`${content}${index}`}>{content}</li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col justify-between w-full'>
            <span className='flex justify-between w-full'>
              <p>33 token</p>
              <p>Goal: 100 token</p>
            </span>
            <Progress value={33} className='' />
          </div>
          <button
            onClick={() => {}}
            className='relative rounded px-5 py-2.5 overflow-hidden group bg-primary-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 w-full'
          >
            <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-80 ease'></span>
            <span className='relative text-dark-1 font-bold'>Vote</span>
          </button>
        </div>
      </div>

      <div className='w-full max-w-5xl'>
        <hr className='border w-full border-dark-4/80' />

        <h3 className='body-bold md:h3-bold w-full my-10'>
          More Related agendas
        </h3>
        {/* {isUseragendaLoading || !relatedagendas ? (
            <Loader />
          ) : (
            <GridagendaList agendas={relatedagendas} />
          )} */}
      </div>
    </div>
  );
};

export default AgendaChoose;
