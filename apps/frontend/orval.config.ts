import { defineConfig } from 'orval'

export default defineConfig({
  gain: {
    input: {
      target: '../backend/openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      schemas: './src/api/model',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: false,
          useInfiniteQueryParam: undefined,
          options: {
            staleTime: 10000,
          },
        },
        operations: {
          getPing: {
            query: {
              useQuery: true,
              useInfinite: false,
              override: {
                useSingleFunction: true,
              },
            },
          },
        },
      },
    },
  },
})
