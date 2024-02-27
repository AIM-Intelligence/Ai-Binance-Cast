'use server';

import { createClientActions } from '@/lib/supabase/actions';
import { cookies } from 'next/headers';

export const getTotalAgendasServer = async () => {
  const cookieStore = cookies();
  const supabase = createClientActions(cookieStore);

  const { data: agendas, error } = await supabase
    .from('agenda')
    .select(`*, creator(id, email, image_url, display_name)`);

  if (error) {
    if (error.code === 'PGRST116') {
      return { error: 1 };
    }
    return { error: 2 };
  }

  if (agendas) return agendas;

  return null;
};


