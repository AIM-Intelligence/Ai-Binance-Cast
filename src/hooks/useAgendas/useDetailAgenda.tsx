import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { getDetailAgendaServer } from '../../../server/actions/agenda-actions/read/detail-agenda';

const useDetailAgendasServer = (
  id: string
): { isFetching: any; data: any | null; error: any } => {
  return useQuery({
    queryKey: ['agendaDetail'],
    queryFn: async () => {
      try {
        const result = await getDetailAgendaServer(id);
        return result;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 4 * 1000,
  });
};

export default useDetailAgendasServer;
