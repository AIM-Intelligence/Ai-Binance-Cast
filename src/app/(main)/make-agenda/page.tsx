import Image from 'next/image';
import MakeAgendaForm from '../../../components/forms/make-agenda-form';

const MakeAgenda = () => {
  return (
    <div className='flex flex-1 h-screen'>
      <div className='home-container max-sm:mb-10'>
        <div className='max-w-5xl flex-start gap-4 justify-start w-full'>
          <Image
            src='/icons/write.svg'
            width={40}
            height={40}
            alt='assume'
            className='dark:invert-white'
          />
          <h2 className='h3-bold  md:h2-bold text-left w-full '>
            안건 신청하기
          </h2>
        </div>

        <MakeAgendaForm />
      </div>
    </div>
  );
};

export default MakeAgenda;
