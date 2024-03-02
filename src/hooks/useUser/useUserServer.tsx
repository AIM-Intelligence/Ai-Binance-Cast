import { useQuery } from '@tanstack/react-query';
import { getUserServer } from '../../../server/actions/auth-actions/read/user';
const useUserClient = (): { isFetching: any; data: any | null; error: any } => {
  return useQuery({
    queryKey: ['user_data'],
    queryFn: async () => {
      getUserServer();
    },
    staleTime: Infinity,
  });
};

export default useUserClient;
