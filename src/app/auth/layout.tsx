import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='px-0 h-lvh lg:grid lg:grid-cols-2'>
      <div className='relative hidden p-10 text-white lg:flex'>
        <Image
          src='/sign-up/1.jpg'
          alt='sign-up image'
          fill
          className='object-cover '
        />

        <blockquote className='space-y-2 z-10 mt-auto'>
          <p className='text-lg'>
            &ldquo;AI가 세상을 이롭게 할 수 있도록&rdquo;
          </p>
          <footer className='text-sm'>AIM Intelligence Agenda</footer>
        </blockquote>
      </div>
      <div className='flex flex-col items-center justify-center h-full px-6'>
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
