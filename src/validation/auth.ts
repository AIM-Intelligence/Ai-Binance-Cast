import * as z from 'zod';

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(12, {
        message: '최소 12자 이상이어야 합니다.',
      })
      .max(30, {
        message: '최대 30자 이하여야 합니다.',
      })
      .regex(/[a-z]/, {
        message: '최소 하나의 영어 소문자를 포함해야 합니다.',
      })
      .regex(/[0-9]/, {
        message: '최소 하나의 숫자를 포함해야 합니다.',
      })
      .regex(/[@#$%^&+=~!]/, {
        message: '최소 하나의 특수기호를 포함해야 합니다.',
      }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
    }
  );

export const resetSchema = z.object({
  email: z.string().email({
    message: '이메일을 입력해주세요.',
  }),
});

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: '이메일 양식에 맞게 입력해주세요.',
    })
    .email({
      message: '이메일을 입력해주세요.',
    }),
  password: z.string().min(1, {
    message: '비밀번호를 입력해주세요.',
  }),
  code: z.optional(z.string()),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: '이름을 입력해주세요',
      })
      .max(30, {
        message: '이름은 최대 30자를 넘을 수 없습니다.',
      }),
    email: z
      .string({
        required_error: '올바른 이메일을 입력해주세요.',
      })
      .email({
        message: '이메일을 입력해주세요.',
      }),
    password: z
      .string()
      .min(12, {
        message: '최소 12자 이상이어야 합니다.',
      })
      .max(30, {
        message: '최대 30자 이하여야 합니다.',
      })
      .regex(/[a-z]/, {
        message: '최소 하나의 영어 소문자를 포함해야 합니다.',
      })
      .regex(/[0-9]/, {
        message: '최소 하나의 숫자를 포함해야 합니다.',
      })
      .regex(/[@#$%^&+=~!]/, {
        message: '최소 하나의 특수기호를 포함해야 합니다.',
      }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
    }
  );
