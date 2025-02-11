import { z } from 'zod'

export const PingResponse = z.object({
  message: z.literal('pong'),
  timestamp: z.string(),
})

export type PingResponse = z.infer<typeof PingResponse>
