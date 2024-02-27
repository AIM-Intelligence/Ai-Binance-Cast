import { useQuery } from '@tanstack/react-query';
import { getTotalAgendasServer } from '../../../server/actions/agenda-actions/read/total-agendas';

const useTotalAgendasServer = (): {
  isFetching: any;
  data: any | null;
  error: any;
} => {
  return useQuery({
    queryKey: ['agendas'],
    queryFn: async () => {
      try {
        const result = await getTotalAgendasServer();
        return result;
      } catch (error) {
        throw error;
      }
    },
    staleTime: Infinity,
    // refetchInterval: 4 * 1000,
  });
};

export default useTotalAgendasServer;
