import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  isUserMessage: z.boolean(),
});

// array validator
export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;

export const MessagePayloadSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(),
  text: z.string(),
  input: z.string(),
  agenda: z.string(),
  agree_disagree: z.string(),
  chat_history: z.array(
    z.object({
      role: z.string(),
      message: z.string(),
    })
  ),
});

export type MessagePayload = z.infer<typeof MessagePayloadSchema>;

export const AgendaAIPayloadSchema = z.object({
  input: z.string(),
  agenda: z.string(),
  agree_disagree: z.string(),
  chat_history: z.array(
    z.object({
      role: z.string(),
      message: z.string(),
    })
  ),
});

export type AgendaAIPayload = z.infer<typeof AgendaAIPayloadSchema>;
