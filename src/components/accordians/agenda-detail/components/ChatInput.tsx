'use client';
import { HTMLAttributes, useContext, useRef, useState } from 'react';
import { cn } from '@/utils';
import { Textarea } from '@/components/ui/textarea';

import { MessagePayload } from '@/validation/message';
import { z } from 'zod';

import { nanoid } from 'nanoid';
import { CornerDownLeft, Loader2 } from 'lucide-react';
import useAIChatServer from '@/hooks/getAIServer.tsx/useAIChatServer';
import { MessagesContext } from '@/context/messages';

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput = (
  { isPendingParent, agree, comment, subject }: any,
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

  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  // TODO: inverseMessages 길이가 5가 넘어가면 point와 혜택을 받는 페이지로 이동하게 된다. => 좀 더 매끄럽게 ux ui를 짜보자

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
                input: comment,
                agenda: subject,
                agree_disagree: agree ? 'agree' : 'disagree',
                chat_history:
                  inverseMessages.length === 3
                    ? [
                        { role: 'user', message: inverseMessages[1]?.text },
                        { role: 'ai', message: inverseMessages[0]?.text },
                      ]
                    : [
                        { role: 'user', message: inverseMessages[3]?.text },
                        { role: 'ai', message: inverseMessages[2]?.text },
                        { role: 'user', message: inverseMessages[1]?.text },
                        { role: 'ai', message: inverseMessages[0]?.text },
                      ],
              };

              sendMessage(message);
            }
          }}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isPending || isPendingParent
              ? 'It is time for the opposing AI spokesperson to speak...'
              : 'Now, please logically refute the opposing AI spokesperson’s claim. The score indicates how well the AI understood your content.(0~10)'
          }
          className='peer disabled:opacity-50 placeholder:text-gray-500 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
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
          className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600'
        />
      </div>
    </div>
  );
};

export default ChatInput;
