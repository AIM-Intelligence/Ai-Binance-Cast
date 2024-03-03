import { MessagesProvider } from '@/context/messages';

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MessagesProvider>{children}</MessagesProvider>;
}
