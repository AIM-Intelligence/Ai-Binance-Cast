'use client';
import AgendaCard from '@/components/cards/agenda-card';
import Loader from '@/components/shared/Loader';
import useTotalAgendasServer from '@/hooks/useAgendas/useTotalAgenda';
import Image from 'next/image';
import { Suspense } from 'react';

export default function Home() {
  const {
    isFetching,
    data: agendas,
    error: agendaError,
  } = useTotalAgendasServer();

  if (isFetching || agendaError) {
    return <Loader />;
  }

  if (agendas.error === 1) {
    return <div>안건을 불러올 수 없습니다.</div>;
  } else if (agendas.error === 2) {
    return <div>안건을 불러오는 데 문제가 발생했습니다.</div>;
  }
  if (agendas.length < 1) {
    return <div>안건이 없습니다.</div>;
  }

  return (
    <main className='flex flex-1'>
      <div className='home-container'>
        <div className='home-agendas'>
          <div className='flex gap-2 w-full max-w-5xl'>
            <Image
              src='/icons/bank.svg'
              width={40}
              height={40}
              alt='edit'
              className='dark:invert-white'
            />
            <h2 className='h3-bold md:h2-bold text-left w-full'>
              Standing Agenda 
            </h2>
          </div>

          <ul className='flex flex-col flex-1 gap-9 w-full '>
            {agendas.map((agenda: any) => (
              <AgendaCard agenda={agenda} key={agenda.id} />
            ))}
          </ul>
        </div>
      </div>

      <div className='home-creators border-l-2'>
        <h3 className='h3-bold text-black dark:text-light-1'>Top Agendas</h3>
        {/* {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </main>
  );
}
