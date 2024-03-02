'use client';
import { MessagesContext } from '@/app/context/messages';
import { Label } from '@/components/ui';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/utils';
import { useContext } from 'react';

const ChatHeader = ({ comment }: any) => {
  const { isGreenfield, setIsGreenfield } = useContext(MessagesContext);

  console.log(isGreenfield);

  return (
    <div className='w-full flex gap-3 justify-between items-center text-zinc-800'>
      <div className='flex flex-col items-start text-sm'>
        <p className='text-lg'>{comment}</p>
      </div>
      <div className='flex flex-col items-center justify-center  space-x-2 gap-2'>
        <Switch
          checked={isGreenfield}
          onClick={(e) => {
            e.stopPropagation();
            setIsGreenfield(!isGreenfield);
          }}
          id='greenfield'
          className={cn('border border-black', isGreenfield && "bg-green-500 border-green-500")  }
        />
        <Label htmlFor='greenfield'>Greenfield</Label>
      </div>
    </div>
  );
};

export default ChatHeader;
