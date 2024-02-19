'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { makeAgendaSchema } from '@/validation/agenda';
import { Textarea } from '@/components/ui/textarea';

import { makeAgendaServer } from '../../../server/actions/agenda-actions/create/agenda';
import { useAction } from 'next-safe-action/hooks';
import useUserServer from '@/hooks/useUser/useUserServer';
import { DEFAULT_LOGIN_PROBLEM_REDIRECT } from '@/routes';
import { cn } from '@/utils';

const MakeAgendaForm = () => {
  const router = useRouter();
  
  

  const form = useForm<z.infer<typeof makeAgendaSchema>>({
    resolver: zodResolver(makeAgendaSchema),
    defaultValues: {
      title: '',
      content: [{ value: '' }, { value: '' }, { value: '' }],
      content_detail: '',
      // TODO : 밑에 걸로 에러가 발생하고 있음 해결 필요
      creator: '',
      image_url: '',
      tags: [{ value: '' }, { value: '' }],
      agree_comment: '',
      disagree_comment: '',
    },
  });

  const { fields: contentFields } = useFieldArray({
    name: 'content',
    control: form.control,
  });

  const { fields: tagsFields, append } = useFieldArray({
    name: 'tags',
    control: form.control,
  });

  const { execute, status, result } = useAction(makeAgendaServer, {
    onSuccess(data) {
      if (data?.error) console.log(data.error);
      if (data?.success) console.log(data.success);
    },
  });

  function onSubmit(values: z.infer<typeof makeAgendaSchema>) {
    console.log(values);
    // upload the image

    //execute(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>질문 (제목)</FormLabel>
              <FormControl>
                <Input className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='image_url'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>사진</FormLabel>
              <FormControl>
                <Input type='file' className='' {...field} accept='image/*' />
              </FormControl>

              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <div>
          {contentFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`content.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(index !== 0 && 'sr-only shad-form_label')}
                  >
                    3줄 요약
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    질문에 대한 부가 설명을 3줄로 정리해주세요.
                  </FormDescription>
                  <FormControl>
                    <Input className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name='content_detail'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                자세한 내용 (필수 아님)
              </FormLabel>
              <FormControl>
                <Textarea
                  className='shad-textarea custom-scrollbar'
                  {...field}
                />
              </FormControl>

              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='agree_comment'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                찬성측 주장 (기본: 찬성 *필수 아님)
              </FormLabel>
              <FormControl>
                <Input className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='disagree_comment'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                반대측 주장 (기본: 반대 *필수 아님)
              </FormLabel>
              <FormControl>
                <Input className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <div>
          {tagsFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`tags.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(index !== 0 && 'sr-only shad-form_label')}
                  >
                    Tags
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    당신을 알 수 있는 다양한 url을 입력해주세요.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} className='shad-input' />
                  </FormControl>
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            tag 추가하기
          </Button>
        </div>

        <Button
          disabled={status === 'executing'}
          type='submit'
          variant='outline'
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default MakeAgendaForm;
