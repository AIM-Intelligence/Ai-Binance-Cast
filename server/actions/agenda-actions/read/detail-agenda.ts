'use server';

import { createClientActions } from '@/lib/supabase/actions';
import { cookies } from 'next/headers';

export const getDetailAgendaServer = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClientActions(cookieStore);

  const { data: agenda, error } = await supabase
    .from('agenda')
    .select(`*, creator(id, address, image_url, display_name)`)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return { error: 1 };
    }
    return { error: 2 };
  }

  if (agenda) return agenda;

  return null;
};
