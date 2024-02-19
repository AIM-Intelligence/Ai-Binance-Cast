import { MessagesProvider } from '@/app/context/messages';

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MessagesProvider>{children}</MessagesProvider>;
}
