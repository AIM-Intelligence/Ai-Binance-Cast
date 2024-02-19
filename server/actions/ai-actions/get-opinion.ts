'use server';
// TODO : NextJS server action에 문제가 있는 지 확인중... 공식 discord 확인 필요
import { z } from 'zod';

import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

//type MessagePayload = z.infer<typeof MessagePayload>;

export const getAIOpinionServer = async (message: any) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let counter = 0;

  //const { message } = await req.json();

  console.log('message', message);

  //! error check
  //throw new Error('message')

  // const payload: MessagePayload = {
  //   input:
  //     'I agree to bitcoin because the volatility will decrease as market matures.',
  //   agenda: 'bitcoin',
  //   agree_disagree: 'agree',
  //   chat_history: [],
  // };

  const res = await fetch(
    'http://ec2-3-34-141-12.ap-northeast-2.compute.amazonaws.com:3000/api/chat',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }
  );

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data;

          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);

            const text = json.answer || '';

            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }

            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error

            controller.error(e);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);

      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;

  // console.log();

  //return new Response(stream);
};
