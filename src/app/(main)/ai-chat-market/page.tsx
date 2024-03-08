'use client';

import Image from 'next/image';

const People = () => {

  return (
    <main className='flex flex-1'>
      <div className='common-container'>
        <div className='home-agendas'>
          <div className='flex gap-4 w-full max-w-5xl'>
            <Image
              src='/icons/shop.svg'
              width={40}
              height={40}
              alt='edit'
              className='dark:invert-white'
            />
            <h2 className='h3-bold md:h2-bold text-left w-full'>Chat Market</h2>
          </div>

          <ul className='flex flex-col flex-1 gap-9 w-full '>
          

            {/* {agendas.map((agenda: any) => (
              <AgendaCard agenda={agenda} key={agenda.id} />
            ))} */}
          </ul>
        </div>
      </div>

      <div className='home-creators border-l-2'>
        <h3 className='h3-bold text-black dark:text-light-1'>Top AI Chat</h3>

        {/* <MessagesProvider>
        <Chat />
      </MessagesProvider> */}
      </div>
    </main>
  );
};

export default People;
