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
      // 自動生成されるコード
      '**/generated/**',
      '**/model/**',
      '**/api/client.ts',

      // 設定ファイル
      '**/*.config.js',
      '**/*.config.ts',

      // ビルド出力
      '**/dist/**',
      '**/build/**',
    ],
  },
]
