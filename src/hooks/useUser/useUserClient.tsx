import { useQuery } from '@tanstack/react-query';

const useUserClient1 = (): {
  isFetching: any;
  data: any | null;
  error: any;
} => {
  return useQuery({
    queryKey: ['user_data'],
    queryFn: async () => {
      // const supabaseAccessToken = await getToken({ template: 'supabase' });
      // //console.log('supabaseAccessToken', getToken({ template: 'supabase' }))
      // const supabase = await supabaseClient(supabaseAccessToken);
      // const new_address = '0x61327612EC4aFD93e370eC0599f933bB08020A54';
      // const { data: user_data, error } = await supabase.rpc(
      //   'get_create_profile',
      //   {
      //     new_address,
      //   }
      // );
      // if (error) console.error(error);
      // else console.log('user_data', user_data);
      // return user_data;
    },
    staleTime: 4 * 1000,
  });
};

export default useUserClient1;
