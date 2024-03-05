'use server';

import { action } from '@/lib/safe-action';
import { createClientServer } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

const schema = z.object({
  agenda_id: z.string(),
});

export const updateAgendaViewsServer = action(schema, async ({ agenda_id }) => {
  const cookieStore = cookies();
  const supabase = createClientServer(cookieStore);
  const { error } = await supabase.rpc('increment_views', {
    agenda_id,
  });

  if (error) return { error: 'A problem has occurred. please try again.' };

  return null;
});
