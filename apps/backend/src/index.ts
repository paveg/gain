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
            message: z.literal('pong!'),
            timestamp: z.string(),
          }),
        },
      },
      description: 'Successful ping response',
    },
  },
})

// トレーニングメトリクスのスキーマ定義
const TrainingMetricsSchema = z.object({
  height: z.number(),
  weight: z.number(),
  gender: z.enum(['male', 'female', 'other']),
  frequency: z.number(),
  benchPress: z.number(),
  squat: z.number(),
  deadlift: z.number(),
})

// トレーニングプログラムの型定義
const TrainingProgramSchema = z.object({
  exercises: z.array(z.object({
    name: z.string(),
    sets: z.number(),
    reps: z.number(),
    weight: z.number().optional(),
    rpe: z.number().optional(),
    notes: z.string().optional(),
  })),
  day: z.number(),
})

const generateProgramRoute = createRoute({
  method: 'post',
  path: '/training/program',
  request: {
    body: {
      content: {
        'application/json': {
          schema: TrainingMetricsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            program: z.array(TrainingProgramSchema),
          }),
        },
      },
      description: 'Generated training program',
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
    message: 'pong!' as const,
    timestamp: new Date().toISOString(),
  })
})

// トレーニングプログラム生成のロジック
function generateTrainingProgram(metrics: z.infer<typeof TrainingMetricsSchema>) {
  const programs = []
  
  // プッシュの日のプログラム
  const pushDay = {
    day: 1,
    exercises: [
      {
        name: "ベンチプレス（メイン）",
        sets: 3,
        reps: 5,
        weight: Math.round(metrics.benchPress * 0.85), // RPE8相当の重量
        rpe: 8,
        notes: "メインセット"
      },
      {
        name: "ベンチプレス（バックオフ）",
        sets: 3,
        reps: 8,
        weight: Math.round(metrics.benchPress * 0.75), // メインセットの-10%程度
        notes: "バックオフセット"
      },
      {
        name: "プルアップ",
        sets: 4,
        reps: 8,
        notes: "自重で実施。できない場合はラットプルダウンで代替"
      },
      {
        name: "ライイングトライセプスエクステンション",
        sets: 3,
        reps: 12,
        notes: "フォームを重視"
      },
      {
        name: "バランストレーナー",
        sets: 3,
        reps: 15,
        notes: "腹筋の意識を高く"
      }
    ]
  }

  programs.push(pushDay)

  // 同様にプル・レッグの日のプログラムも追加可能
  
  return programs
}

app.openapi(generateProgramRoute, (c) => {
  const metrics = c.req.valid('json')
  const program = generateTrainingProgram(metrics)
  return c.json({ program })
})

// Generate OpenAPI specification
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
                      enum: ['pong!'],
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

// Server startup
const port = 8787
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
