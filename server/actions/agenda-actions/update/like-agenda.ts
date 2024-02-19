'use server';

import { createClientServer } from '@/lib/supabase/server';
import { likePayload } from '@/validation/agenda';
import { cookies } from 'next/headers';

export const updateAgendaLikesServer = async ({
  agenda_id,
  new_likes_list,
  user_id,
  plus_check,
}: likePayload) => {
  const cookieStore = cookies();
  const supabase = createClientServer(cookieStore);

  let { error } = await supabase.rpc('update_likes', {
    agenda_id,
    new_likes_list,
    user_id,
    plus_check,
  });

  if (error) return { error: '문제가 발생했습니다. 다시 시도해주세요.' };

  return null;
};
