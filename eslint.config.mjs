import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

// Plugin: unused-imports
const unusedImports = await import('eslint-plugin-unused-imports');

export default [
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      'unused-imports': unusedImports.default,
    },
    rules: {
      // 🔥 Strict formatting
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-multi-spaces': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'prettier/prettier': ['error', { singleQuote: true, semi: true }],

      // 🚫 Unused cleanup
      'no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
      'unused-imports/no-unused-imports': 'error',

      // 📦 Import sorting
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
  },
];
