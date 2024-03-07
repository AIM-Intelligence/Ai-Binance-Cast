'use client';
import { createContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { Message } from '@/validation/message';

const defaultValue = [
  {
    id: nanoid(),
    text: 'hello. I am the AI spokesperson for the other side.',
    isUserMessage: false,
  },
];

export const MessagesContext = createContext<{
  messages: Message[];
  isMessageUpdating: boolean;
  isGreenfield: boolean;
  isBucketed: boolean;
  bucketName: string;
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  removeAllMessages: () => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;

  setIsMessageUpdating: (isUpdating: boolean) => void;
  setIsGreenfield: (isGreenfield: boolean) => void;
  setIsBucketed: (isBucketed: boolean) => void;
  setBucketName: (bucketName: string) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  isGreenfield: false,
  isBucketed: false,
  bucketName: '',
  addMessage: () => {},
  removeMessage: () => {},
  removeAllMessages: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
  setIsGreenfield: () => {},
  setIsBucketed: () => {},
  setBucketName: () => {},
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState(defaultValue);
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
  const [isGreenfield, setIsGreenfield] = useState<boolean>(false);
  const [isBucketed, setIsBucketed] = useState<boolean>(false);
  const [bucketName, setBucketName] = useState<string>('');

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      })
    );
  };

  const removeAllMessages = () => {
    setMessages([]);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        isGreenfield,
        isBucketed,
        bucketName,
        addMessage,
        removeMessage,
        removeAllMessages,
        updateMessage,
        setIsMessageUpdating,
        setIsGreenfield,
        setIsBucketed,
        setBucketName,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
