import Bottombar from '@/components/bars/bottom-bar';
import LeftSidebar from '@/components/bars/leftSide-bar';
import Topbar from '@/components/bars/top-bar';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getUserServer } from '../../../server/actions/auth-actions/read/user';
import { getTotalAgendasServer } from '../../../server/actions/agenda-actions/read/total-agendas';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await Promise.all([
    // queryClient.prefetchQuery({
    //   queryKey: ['user'],
    //   queryFn: getUserServer,
    // }),
    // queryClient.prefetchQuery({
    //   queryKey: ['agendas'],
    //   queryFn: getTotalAgendasServer,
    // }),
  ]);

  // await queryClient.prefetchQuery({
  //   queryKey: ['user'],
  //   queryFn: getUserServer,
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ['agendas'],
  //   queryFn: getTotalAgendasServer,
  // });

  return (
    <section className='w-full h-screen md:flex '>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Topbar />
        <LeftSidebar />
        <section className='flex flex-1 h-full max-sm:pb-32'>
          {children}
        </section>
        <Bottombar />
      </HydrationBoundary>
    </section>
  );
}
