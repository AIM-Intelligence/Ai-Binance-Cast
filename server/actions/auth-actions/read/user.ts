'use server';

import { createClientServer } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export const getUserServer = async () => {
  const cookieStore = cookies();
  const supabase = createClientServer(cookieStore);
  const { data, error } = await supabase.auth.getUser();

  if (error) return { error: '문제가 발생했습니다. 다시 시도해주세요.' };

  if (data?.user) {
    // fetch user info profile
    const { data: user } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    return user;
  }

  return null;
};
