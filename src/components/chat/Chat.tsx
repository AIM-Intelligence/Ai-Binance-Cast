'use client';
import { useContext, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { MessagesContext } from '@/context/messages';
import { MessagePayload } from '@/validation/message';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import useAIChatServer from '@/hooks/getAIServer.tsx/useAIChatServer';

const Chat = () => {
  const [close, setClose] = useState(0);

  const { removeAllMessages } = useContext(MessagesContext);

  const firstTouch = true;

  const { mutate: sendMessage, isPending } = useAIChatServer(firstTouch);

  return (
    <Accordion type='single' collapsible className='relative shadow'>
      <AccordionItem value='item-1'>
        <div className='w-80 bg-white border border-gray-200 rounded-md overflow-hidden'>
          <div className='w-full h-full flex flex-col '>
            <AccordionTrigger
              disabled={isPending}
              onClick={() => {
                if (close) {
                  removeAllMessages();
                  setClose(0);
                } else {
                  const message: MessagePayload = {
                    id: nanoid(),
                    isUserMessage: true,
                    text: 'I agree to bitcoin because the volatility will decrease as market matures.',
                    input:
                      'I agree to bitcoin because the volatility will decrease as market matures.',
                    agenda: 'bitcoin',
                    agree_disagree: 'agree',
                    chat_history: [],
                  };

                  sendMessage(message);
                  setClose(1);
                }
              }}
              className='px-6 border-b border-zinc-300'
            >
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col h-80 text-black'>
                <ChatMessages className='px-2 py-3 flex-1' />
                <ChatInput className='px-4' isPendingParent={isPending} />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default Chat;
