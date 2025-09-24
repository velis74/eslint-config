import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import unicorn from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';
import es from 'eslint-plugin-es';

export default [
  // Ignore patterns
  {
    ignores: ['dist/*', 'coverage/*', 'node_modules/*']
  },

  // Base JavaScript config
  js.configs.recommended,

  // TypeScript config
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
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'vue': vue,
      'prettier': prettier,
      'unicorn': unicorn,
      'import': importPlugin,
      'es': es,
    },
    settings: {
      'import/resolver': {
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
      }],

      // Vue rules
      ...vue.configs.essential.rules,
      ...vue.configs['strongly-recommended'].rules,
      ...vue.configs.recommended.rules,

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
      'vue/max-attributes-per-line': ['warn', { 'singleline': { 'max': 10 } }],
      'vue/singleline-html-element-content-newline': ['off'],

      // TypeScript rules
      ...typescript.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',

      // Import rules
      'sort-imports': 'off',
      'import/extensions': ['error', 'always', {
        'js': 'never',
        'ts': 'never',
        'vue': 'never',
      }],
      'import/order': [
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

  // Jest/test files override
  {
    files: ['**/*.spec.{j,t}s?(x)'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      }
    }
  }
];
