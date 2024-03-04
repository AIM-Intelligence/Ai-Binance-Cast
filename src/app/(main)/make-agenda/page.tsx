'use client';
import Image from 'next/image';
import MakeAgendaForm from '../../../components/forms/make-agenda-form';

const MakeAgenda = () => {
  return (
    <div className='common-container'>
      <div className='max-w-5xl flex-start gap-4 justify-start w-full'>
        <Image
          src='/icons/write.svg'
          width={40}
          height={40}
          alt='assume'
          className='dark:invert-white'
        />
        <h2 className='h3-bold  md:h2-bold text-left w-full'>Enroll Agenda</h2>
      </div>

      <MakeAgendaForm />
    </div>
  );
};

export default MakeAgenda;
