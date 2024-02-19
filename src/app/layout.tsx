import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import QueryProvider from '@/lib/providers/query-provider';
import { ModalProvider } from '@/lib/providers/modal-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI 대변인',
  description: 'using AIM Intelligence Tech',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
