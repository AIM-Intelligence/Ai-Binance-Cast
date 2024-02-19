import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AgendaCardMenu = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src={'/icons/menu-dots-vertical.svg'}
            alt='agenda card menu'
            width={20}
            height={20}
            className='dark:invert-white'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white dark:bg-black'>
          <DropdownMenuItem>공유하기</DropdownMenuItem>
          <DropdownMenuItem>유튜브 일정</DropdownMenuItem>
          <DropdownMenuItem>신고하기</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AgendaCardMenu;
