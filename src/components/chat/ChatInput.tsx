'use client';
import { HTMLAttributes, useRef, useState } from 'react';
import { cn } from '@/utils';
import { Textarea } from '../ui/textarea';

import { MessagePayload } from '@/validation/message';
import { z } from 'zod';

import { nanoid } from 'nanoid';
import { CornerDownLeft, Loader2 } from 'lucide-react';
import useAIChatServer from '@/hooks/getAIServer.tsx/useAIChatServer';

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput = (
  { isPendingParent }: any,
  { className, ...props }: ChatInputProps
) => {
  const [input, setInput] = useState<string>('');
  let textareaRef = useRef<null | HTMLTextAreaElement>(null);

  const firstTouch = false;

  const { mutate: sendMessage, isPending } = useAIChatServer(
    firstTouch,
    textareaRef,
    setInput
  );

  return (
    <div {...props} className={cn('border-t border-zinc-300', className)}>
      <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
        <Textarea
          ref={textareaRef}
          disabled={isPending || isPendingParent}
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();

              const message: MessagePayload = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
                input:
                  'I agree to bitcoin because the volatility will decrease as market matures.',
                agenda: 'bitcoin',
                agree_disagree: 'agree',
                chat_history: [],
              };

              sendMessage(message);
            }
          }}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Refute the claims of the opposing AI spokesperson.'
          className='peer disabled:opacity-50 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
        />

        <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
          <kbd className='inline-flex items-center rounded border bg-white border-gray-200 px-1 text-xs text-gray-400'>
            {isPending || isPendingParent ? (
              <Loader2 className='w-3 h-3 animate-spin' />
            ) : (
              <CornerDownLeft className='w-3 h-3' />
            )}
          </kbd>
        </div>

        <div
          aria-hidden='true'
          className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-primary-500'
        />
      </div>
    </div>
  );
};

export default ChatInput;
