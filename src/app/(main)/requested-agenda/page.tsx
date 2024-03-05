import AgendaCard from '@/components/cards/requested-agenda-card';
import Image from 'next/image';

const MyOpinion = () => {
  return (
    <main className='flex flex-1'>
      <div className='common-container'>
        <div className='home-agendas'>
          <div className='flex gap-4 w-full max-w-5xl'>
            <Image
              src='/icons/customer-care.svg'
              width={40}
              height={40}
              alt='edit'
              className='dark:invert-white'
            />
            <h2 className='h3-bold md:h2-bold text-left w-full'>Vote Agenda</h2>
          </div>

          <ul className='flex flex-col flex-1 gap-9 w-full '>
            {/* {test_agenda.map((agenda: any) => (
            <AgendaCard agenda={agenda} key={agenda.id} />
          ))} */}
          </ul>
        </div>
      </div>

      <div className='home-creators border-l-2'>
        <h3 className='h3-bold text-black dark:text-light-1'>
          Top Vote Agendas
        </h3>
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

        {/* <MessagesProvider>
      <Chat />
    </MessagesProvider> */}
      </div>
    </main>
  );
};

export default MyOpinion;
