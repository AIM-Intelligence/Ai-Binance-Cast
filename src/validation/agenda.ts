import * as z from 'zod';

export const makeAgendaSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: '제목은 최소 2글자 입니다.',
    })
    .max(200, {
      message: '제목은 최대 200글자 입니다.',
    }),
  image_url: z.string().url().min(5, {
    message: '이미지를 첨부해주세요.',
  }),
  content: z.array(
    z.object({
      value: z
        .string()
        .min(2, { message: '최소 2글자 입니다.' })
        .max(20, { message: '최대 20글자 입니다.' }),
    })
  ),
  content_detail: z.string().max(800, {
    message: '최대 800글자 입니다.',
  }),
  creator: z.string().min(2, {
    message: '로그인 정보가 확인되지 않습니다.',
  }),
  tags: z
    .array(
      z.object({
        value: z
          .string()
          .min(2, { message: '최소 2글자 입니다.' })
          .max(20, { message: '최대 20글자 입니다.' }),
      })
    )
    .max(5, { message: '최대 5개의 태그를 넣을 수 있습니다.' }),
  agree_comment: z
    .string()
    .max(100, {
      message: '최대 100글자입니다.',
    })
    .optional(),
  disagree_comment: z
    .string()
    .max(100, {
      message: '최대 100글자 입니다.',
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