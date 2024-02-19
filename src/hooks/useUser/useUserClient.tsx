//! Avoid using spoofing if possible due to security issues.
'use client';
import { createClientBrowser } from '@/lib/supabase/browser';
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

// const initUser = {
//   age: 0,
//   coin: 0,
//   coupon: '',
//   created_at: '',
//   display_name: '',
//   email: '',
//   gender: '',
//   id: '',
//   image_url: '',
//   phone_number: '',
//   token: 0,
// };

const useUserClient = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const supabase = createClientBrowser();
      const { data, error } = await supabase.auth.getSession();

      if (error) return redirect('/');

      if (data.session?.user) {
        // fetch user info profile
        const { data: user } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();

        return user;
      }

      return null;
    },
  });
};

export default useUserClient;
