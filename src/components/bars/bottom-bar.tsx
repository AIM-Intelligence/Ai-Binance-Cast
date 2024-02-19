'use client';
import { bottombarLinks } from '@/constants/bar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Bottombar = () => {
  const pathname = usePathname();

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            href={link.route}
            key={link.label}
            className={` ${
              isActive && 'bg-primary-500 rounded-[10px]'
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <Image
              src={link.imgURL}
              alt={link.label}
              className={` ${isActive && 'invert-white'}`}
              width={30}
              height={30}
            />
            <p
              className={`tiny-medium dark:text-light-2 ${
                isActive && 'text-white'
              }`}
            >
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
