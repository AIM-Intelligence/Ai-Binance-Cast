import { MessagesContext } from '@/context/messages';
import { Message, MessagePayload } from '@/validation/message';
import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { useContext } from 'react';

const useAIChatServer = (
  firstTouch: boolean,
  textareaRef?: React.RefObject<HTMLTextAreaElement> | undefined,
  setInput?: (input: string) => void | undefined
): { mutate: any; isPending: any } => {
  const { addMessage, removeMessage, updateMessage, setIsMessageUpdating } =
    useContext(MessagesContext);

  return useMutation({
    mutationFn: async (message: MessagePayload) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });
      if (!response.ok) {
        throw new Error();
      }
      return response.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error('No stream found');

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: '',
      };

      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();

        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }

      // clean up
      setIsMessageUpdating(false);
      setTimeout(() => {
        textareaRef?.current?.focus();
      }, 10);

      if (!firstTouch) {
        setInput!('');
      }
    },
    onError: (_, message) => {
      if (!firstTouch) {
        textareaRef?.current?.focus();
      }
      removeMessage(message.id);
    },
  });
};

export default useAIChatServer;
