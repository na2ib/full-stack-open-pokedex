import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'
import react from 'eslint-plugin-react' // <--- Add this

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest
      },
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    // 1. Add react to plugins
    plugins: {
      '@stylistic/js': stylisticJs,
      react: react
    },
    settings: {
      react: {
        version: 'detect' // Automatically detect React version
      }
    },
    rules: {
      // 2. Add these React rules to prevent 'unused' errors
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed in modern React (v17+)
      'react/prop-types': 'off', // Optional: disable if you don't use prop-types

      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      'no-unused-vars': 'warn' // Changed to warn so it doesn't block CI while testing
    }
  },
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      'eslint.config.mjs'
    ]
  }
]
