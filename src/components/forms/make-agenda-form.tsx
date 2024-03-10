"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { makeAgendaSchema } from "@/validation/agenda";
import { Textarea } from "@/components/ui/textarea";

import { makeAgendaServer } from "../../../server/actions/agenda-actions/create/agenda";
import { useAction } from "next-safe-action/hooks";
import useUserClient from "@/hooks/useUser/useUserServer";
import { DEFAULT_LOGIN_PROBLEM_REDIRECT } from "@/routes";
import { cn } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { Loader } from "../shared";

const MakeAgendaForm = () => {
  const router = useRouter();
  const { isSignedIn, user: user_address } = useUser();
  const userAddress = user_address?.primaryWeb3Wallet!.web3Wallet;
  const { data: user, error: userError } = useUserClient();
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  if (userError) {
    router.replace(DEFAULT_LOGIN_PROBLEM_REDIRECT);
  }

  const form = useForm<z.infer<typeof makeAgendaSchema>>({
    resolver: zodResolver(makeAgendaSchema),
    defaultValues: {
      title: "",
      content: [{ value: "" }, { value: "" }, { value: "" }],
      content_detail: "",
      // TODO : 밑에 걸로 에러가 발생하고 있음 해결 필요
      image_url: "",
      agree_comment: "",
      disagree_comment: "",
    },
  });

  const { fields: contentFields } = useFieldArray({
    name: "content",
    control: form.control,
  });

  // const { fields: tagsFields, append } = useFieldArray({
  //   name: 'tags',
  //   control: form.control,
  // });

  const { execute, status, result } = useAction(makeAgendaServer, {
    onSuccess(data) {
      if (data?.error) console.log(data.error);
      if (data?.success) console.log(data.success);
    },
  });

  function onSubmit(values: z.infer<typeof makeAgendaSchema>) {
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      router.push("/requested-agenda");
    }, 3000);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">사진</FormLabel>
              <FormControl>
                <Input type="file" className="" {...field} accept="image/*" />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Title (Question)
              </FormLabel>
              <FormControl>
                <Input className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
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
                    className={cn(index !== 0 && "sr-only shad-form_label")}
                  >
                    3-line summary
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Please provide 3 lines of additional explanation for your
                    question.
                  </FormDescription>
                  <FormControl>
                    <Input className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="content_detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">More details</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agree_comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Positive Opinion (default: agree)
              </FormLabel>
              <FormControl>
                <Input className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disagree_comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Negative Opinion (default: disagree)
              </FormLabel>
              <FormControl>
                <Input className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* <div>
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormDescription>press enter to add new tag</FormDescription>
                <FormControl>
                  <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name='fruits'
                    placeHolder='enter fruits'
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />
        </div> */}

        <Button
          disabled={true}
          type="submit"
          variant="outline"
          className="h-[50px] text-lg"
        >
          {loading ? <Loader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default MakeAgendaForm;
