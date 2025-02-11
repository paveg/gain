import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { writeFileSync } from 'fs'
import { cors } from 'hono/cors'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = new OpenAPIHono()

const pingRoute = createRoute({
  method: 'get',
  path: '/ping',
  tags: ['System'],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.literal('pong'),
            timestamp: z.string(),
          }),
        },
      },
      description: 'Successful ping response',
    },
  },
})

app.doc('/api/docs', {
  openapi: '3.0.0',
  info: {
    title: 'Gain API',
    version: '1.0.0',
  },
})

app.use('/api/docs/ui', swaggerUI({ url: '/api/docs' }))
app.use('/*', cors())

app.openapi(pingRoute, c => {
  return c.json({
    message: 'pong' as const,
    timestamp: new Date().toISOString(),
  })
})

// OpenAPI仕様の生成
const apiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Gain API',
    version: '1.0.0',
  },
  paths: {
    '/ping': {
      get: {
        tags: ['System'],
        responses: {
          200: {
            description: 'Successful ping response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      enum: ['pong'],
                    },
                    timestamp: {
                      type: 'string',
                    },
                  },
                  required: ['message', 'timestamp'],
                },
              },
            },
          },
        },
      },
    },
  },
}

const openApiPath = resolve(__dirname, '../openapi.json')
writeFileSync(openApiPath, JSON.stringify(apiSpec, null, 2))

// サーバーの起動
const port = 8787
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
