import * as z from 'zod';

export const makeAgendaSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'At least 2 characters',
    })
    .max(200, {
      message: 'At least 200 characters',
    }),
  image_url: z.string().min(5, {
    message: 'Please attach an image.',
  }),
  content: z.array(
    z.object({
      value: z
        .string()
        .min(2, { message: 'At least 2 characters' })
        .max(1000, { message: 'At least 20 characters' }),
    })
  ),
  content_detail: z.string().max(800, {
    message: 'Up to 800 characters',
  }),
  agree_comment: z
    .string()
    .max(100, {
      message: 'Up to 100 characters',
    })
    .optional(),
  disagree_comment: z
    .string()
    .max(100, {
      message: 'Up to 100 characters',
    })
    .optional(),
});

// email: z
// .string({
//   required_error: 'wefwefowefewf display.',
// })
// .email(),

export type likePayload = z.infer<typeof updateLikeschema>;

export const updateLikeschema = z.object({
  agenda_id: z.string(),
  new_likes_list: z.array(z.string()),
  user_id: z.string(),
  plus_check: z.boolean(),
});
