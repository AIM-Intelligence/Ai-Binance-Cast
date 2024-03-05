'use client';
import { MessagesContext } from '@/context/messages';
import { cn } from '@/utils';
import { HTMLAttributes, useContext } from 'react';
import MarkdownLite from './MarkdownLite';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui';

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages = ({ className, ...props }: ChatMessageProps) => {
  const { messages, isGreenfield, setIsGreenfield } =
    useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  console.log('inverseMessages', inverseMessages);

  return (
    <>
      <div className='flex gap-1.5 items-center justify-around py-2 border-b'>
        <div className='flex gap-1.5 items-center'>
          <span className='relative flex h-3 w-3'>
            <p className='animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75'></p>
            <p className='relative inline-flex rounded-full h-3 w-3 bg-rose-500'></p>
          </span>
          <p className='font-medium'>AIM Secrity Filter Activating</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Switch
            checked={isGreenfield}
            onClick={(e) => {
              e.stopPropagation();
              setIsGreenfield(!isGreenfield);
            }}
            id='greenfield'
            className={cn(
              'border border-black',
              isGreenfield && 'bg-green-500 border-green-500'
            )}
          />
          <Label htmlFor='greenfield'>Greenfield</Label>
        </div>
      </div>

      <div
        {...props}
        className={cn(
          'flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch',
          className
        )}
      >
        <div className='flex-1 flex-grow' />

        {inverseMessages.map((message) => (
          <div key={message.id} className='chat-message'>
            <div
              className={cn('flex items-end', {
                'justify-end': message.isUserMessage,
              })}
            >
              <div
                className={cn(
                  'flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden',
                  {
                    'order-1 items-end': message.isUserMessage,
                    'order-2 items-start': !message.isUserMessage,
                  }
                )}
              >
                <p
                  className={cn('px-4 py-2 rounded-lg', {
                    'bg-blue-600 text-white': message.isUserMessage,
                    'bg-gray-200 text-gray-900': !message.isUserMessage,
                  })}
                >
                  <MarkdownLite text={message.text} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatMessages;