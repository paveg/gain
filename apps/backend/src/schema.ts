import { z } from 'zod'

export const PingResponseSchema = z.object({
  message: z.literal('pong'),
  timestamp: z.string(),
})

export type PingResponse = z.infer<typeof PingResponseSchema>
