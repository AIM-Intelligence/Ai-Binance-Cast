'use server';
// 2 44

import { makeAgendaSchema } from '@/validation/agenda';
import * as z from 'zod';
import { revalidatePath } from 'next/cache';
import { action } from '@/lib/safe-action';

export const makeAgendaServer = action(
  makeAgendaSchema,
  async ({ content }) => {
    if (!content) return { error: 'Content was not received from the server.' };
    return { success: 'Content was not received from the server.' };

    //revalidatePath('/');

    // if (!newAssumeAgenda) return { error: '안건을 제작하는데 문제가 생겼습니다.' };

    // if (newAssumeAgenda[0].id) return { success: '안건이 만들어졌습니다.' };
  }
);

// type AssumeAgenda = z.infer<typeof AssumeAgendaSchema>

// export const assumeAgenda = async (values: AssumeAgenda) => {
//   const newAssumeAgenda = await db.insert(assumedAgenda).values({
//     title: values.title,
//   }).returning();

//   revalidatePath('/')

//   if(!newAssumeAgenda) return {error: '현재 안건을 상정할 수 없습니다.'}

//   if(newAssumeAgenda[0].id) return{ success: '안건이 상정되었습니다.'}

// }
