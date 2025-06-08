import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  // Base ESLint recommended config
  {
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.vue']
      }
    }
  },

  // Vue.js configuration
  {
    files: ['**/*.vue'],
    ...vuePlugin.configs['flat/recommended']
  },
  
  // TypeScript configuration
  {
    files: ['**/*.ts', '**/*.vue'],
    ...tsPlugin.configs['recommended-type-checked']
  },

  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', {
        semi: true,
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        trailingComma: 'none',
        arrowParens: 'avoid',
        bracketSpacing: true
      }],
    },
  },
];
