import { useQuery } from '@tanstack/react-query';
import { getUserServer } from '../../../server/actions/auth-actions/read/user';

// TODO : 일단 이렇게 하고 react-query tool 로 type content 활용하기
const useUserServer = (): { isFetching: any; data: any | null; error: any } => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      getUserServer();
    },
  });
};

export default useUserServer;
