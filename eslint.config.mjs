import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import unicorn from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import-x';
import prettierConfig from 'eslint-config-prettier/flat';
import globals from 'globals';

export default [
  // Ignore patterns
  {
    ignores: ['dist/*', 'coverage/*', 'node_modules/*']
  },

  // Base JavaScript config
  js.configs.recommended,

  // TypeScript and Vue presets
  ...typescript.configs['flat/recommended'],
  ...vue.configs['flat/recommended'],

  // TypeScript already checks what these core rules check; the preset only covers .ts files
  {
    ...typescript.configs['flat/eslint-recommended'],
    name: 'velis/typescript-eslint-recommended-vue',
    files: ['**/*.vue'],
  },

  // Turns off rules that conflict with prettier; must precede the velis rules below
  prettierConfig,

  // Velis config
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'esnext',
        sourceType: 'module',
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    },
    plugins: {
      'prettier': prettier,
      'unicorn': unicorn,
      'import-x': importPlugin,
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      // Prettier rules
      'prettier/prettier': ['error', {
        'printWidth': 120,
        'tabWidth': 2,
        'singleQuote': true,
        'trailingComma': 'all',
        'bracketSpacing': true,
        'semi': true,
        'endOfLine': 'auto',
        'arrowParens': 'always',
        'htmlWhitespaceSensitivity': 'ignore',
      }],

      // Vue rules
      'vue/max-len': ['error', {
        'code': 120,
        'template': 120,
        'tabWidth': 2,
        'comments': 120
      }],
      'vue/html-closing-bracket-spacing': 'error',
      'vue/html-self-closing': ["error", {
        'html': {
          'void': 'always',
          'normal': 'always',
          'component': 'always',
        },
        'svg': 'always',
        'math': 'always',
      }],
      'vue/no-v-html': ['off'],
      'vue/singleline-html-element-content-newline': ['off'],

      // TypeScript rules
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // Import rules
      'sort-imports': 'off',
      'import-x/extensions': ['error', 'always', {
        'js': 'never',
        'ts': 'never',
        'vue': 'never',
      }],
      'import-x/order': [
        'error', { 'newlines-between': 'always', 'alphabetize': { 'order': 'asc', 'caseInsensitive': true } }
      ],

      // General rules
      'no-console': 'off',
      'no-plusplus': 'off',
      'no-param-reassign': ['error', { 'props': false }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
        },
        {
          selector: 'LabeledStatement',
          message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
        },
        {
          selector: 'WithStatement',
          message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
        },
      ],

      // Unicorn rules
      'unicorn/filename-case': ['error', { 'case': 'kebabCase' }]
    }
  },

  // Test files
  {
    files: ['**/*.spec.{j,t}s?(x)'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.vitest,
      }
    }
  }
];
