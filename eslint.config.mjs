import js from '@eslint/js';
import { typescript } from '@vue/eslint-config-typescript';
import vue from 'eslint-plugin-vue';
import prettier from '@vue/eslint-config-prettier';

export default [
  js.configs.recommended,

  ...typescript({
    files: ['**/*.ts', '**/*.vue'],
    vue: true,
  }),

  {
    plugins: {
      vue,
    },
    rules: {
      ...vue.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off',
    },
  },

  ...prettier()
];