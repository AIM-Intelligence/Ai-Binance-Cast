import { useQuery } from '@tanstack/react-query';
import { getUserServer } from '../../../server/actions/auth-actions/read/user';

const useUserServer = (): { isFetching: any; data: any | null; error: any } => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      getUserServer();
    },
    // staleTime: Infinity,
  });
};

export default useUserServer;
