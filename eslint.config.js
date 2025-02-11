import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ignores: [
      // Generated code
      '**/generated/**',
      '**/model/**',
      '**/api/client.ts',

      // Config files
      '**/*.config.js',
      '**/*.config.ts',

      // Build output
      '**/dist/**',
      '**/build/**',
    ],
  },
]
