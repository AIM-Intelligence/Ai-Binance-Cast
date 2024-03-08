'use client';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { cn, multiFormatDateString } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { AgendaAgreeAccordion } from '@/components/accordians/agenda-detail/agenda-detail-agree';
import { AgendaDisagreeAccordion } from '@/components/accordians/agenda-detail/agenda-detail-disagree';
import useDetailAgendasServer from '@/hooks/useAgendas/useDetailAgenda';
import { useContext, useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { updateAgendaViewsServer } from '../../../../../server/actions/agenda-actions/update/views-agenda';
import DetailAgendaStats from '../../../../components/cards/agenda-detail_stats';
import AgendaDetailCardMenu from '@/components/menu/agenda-detail-card-menu';
import shortenAddress from '@/utils/shortenAddress';
import { useUser } from '@clerk/nextjs';

const AgendaChoose = ({ params }: { params: { id: string } }) => {
  const { isSignedIn } = useUser();

  const id = params.id;
  const router = useRouter();

  // Agree와 Disagree Accordion의 상태를 추적하는 상태 변수 정의
  const [agreeClicked, setAgreeClicked] = useState(false);
  const [disagreeClicked, setDisagreeClicked] = useState(false);

  const { execute } = useAction(updateAgendaViewsServer);

  useEffect(() => {
    execute({ agenda_id: params.id });
  }, []);

  const {
    isFetching,
    data: agendaDetail,
    error: agendaError,
  } = useDetailAgendasServer(id);

  if (isFetching) {
    return (
      <div className='isfetching-flex'>
        <Loader />
      </div>
    );
  }

  if (!isSignedIn) {
    alert('Please sign in');
    router.push('/');
  }

  if (agendaDetail.error === 1) {
    return <div>안건을 불러올 수 없습니다.</div>;
  } else if (agendaDetail.error === 2 || agendaError) {
    return <div>안건을 불러오는 데 문제가 발생했습니다.</div>;
  }

  if (agendaDetail.id === null) {
    return <div>안건의 내용이 없습니다.</div>;
  }

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
              href={`/user/${agendaDetail.creator.id}`}
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
                  <p className='subtle-semibold lg:small-regular '>
                    {multiFormatDateString(agendaDetail.created_at)}
                  </p>
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
              {agendaDetail.content.map((content: string, index: string) => (
                <li key={`${content}${index}`}>{content}</li>
              ))}
            </ul>
            <ul className='flex flex-wrap gap-1 mt-2'>
              {agendaDetail.tags.map((tag: string, index: string) => (
                <li
                  key={`${tag}${index}`}
                  className='text-light-3 small-regular'
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <div className='w-full'>
            <DetailAgendaStats agenda={agendaDetail} />
          </div>
        </div>
      </div>

      <div className='max-w-5xl grid grid-cols-1 sm:grid-cols-2 w-full gap-10 '>
        <AgendaAgreeAccordion
          disagreeClicked={disagreeClicked}
          setAgreeClicked={setAgreeClicked}
          agendaDetail={agendaDetail}
        />
        <AgendaDisagreeAccordion
          setDisagreeClicked={setDisagreeClicked}
          agreeClicked={agreeClicked}
          agendaDetail={agendaDetail}
        />
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
