'use server';

import { action } from '@/lib/safe-action';
import { createClientServer } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
});

export const getOtherUserServer = action(schema, async ({ id }) => {
  const cookieStore = cookies();
  const supabase = createClientServer(cookieStore);
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return { error: 'A problem has occurred. please try again.' };

  if (data) return data;

  return { error: '데이터가 검색되지 않습니다.' };
});
