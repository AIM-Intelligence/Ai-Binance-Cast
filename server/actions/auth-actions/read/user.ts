'use server';

import { supabaseClient } from '@/lib/supabase/browser';
import { createClientServer } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs/server';

export const getUserServer = async () => {
  const user = await currentUser();
  const { userId, getToken } = auth();

  if (!userId) {
    return null;
  }

  const supabaseAccessToken = await getToken({ template: 'supabase' });

  const supabase = await supabaseClient(supabaseAccessToken);
  const new_address = user?.web3Wallets[0].web3Wallet;

  // const { data: user_data, error } = await supabase.rpc(
  //   'get_create_profile',
  //   {
  //     new_address,
  //   }
  // );

  const { data: user_data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('address', new_address);

  if (error) return { error: 'A problem has occurred. please try again.' };

  if (user_data?.length !== 0) {
    return user_data;
  } else {
    const { data: user_data, error } = await supabase
      .from('profiles')
      .insert({ address: new_address })
      .select();
    if (error) return { error: 'A problem has occurred. please try again.' };
    return user_data;
  }

  return null;
};
