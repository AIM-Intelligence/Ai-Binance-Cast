'use client';

import AgendaCardList from '@/components/list/agenda-card-list';
import Loader from '@/components/shared/Loader';

import Image from 'next/image';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className='flex flex-1'>
      <div className='common-container'>
        <div className='home-agendas'>
          <div className='flex gap-2 w-full max-w-5xl'>
            <Image
              src='/icons/bank.svg'
              width={40}
              height={40}
              alt='edit'
              className='dark:invert-white'
            />
            <h2 className='h3-bold md:h2-bold text-left w-full'>Agenda</h2>
          </div>

          <Suspense fallback={<Loader />}>
            <AgendaCardList />
          </Suspense>
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
