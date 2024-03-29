module.exports = {
  root: true,
  env: { 'node': true },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    '@vue/eslint-config-airbnb-with-typescript',
  ],
  plugins: [
    'es',
    '@typescript-eslint',
    'unicorn'
  ],
  parserOptions: {
    ecmaVersion: "esnext", // should match the one in tsconfig.json
    project: "./tsconfig.json",
    extraFileExtensions: [".vue"],
  },
  ignorePatterns: ["dist/*", "coverage/*", "node_modules/*"],
  rules: {
    "vue/max-len": ["error", {
        "code": 120,
        "template": 120,
        "tabWidth": 200, // just so it fails when a tab is encountered
        "comments": 120
    }],
    'no-console': 'off',
    'no-plusplus': 'off',
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    'sort-imports': 'off', // taken care of by vue plugin
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'ts': 'never',
      'vue': 'never',
    }],
    'import/order': [
      'error', { 'newlines-between': 'always', 'alphabetize': { 'order': 'asc', 'caseInsensitive': true } }
    ],
    'indent': ['error', 2, { 'MemberExpression': 1 }],
    "@typescript-eslint/indent": "off",
    'no-param-reassign': ['error', { 'props': false }],
    'prefer-destructuring': [
      'warn',
      {
        'VariableDeclarator': { 'array': false, 'object': false },
        'AssignmentExpression': { 'array': false, 'object': false }
      },
      { 'enforceForRenamedProperties': false }
    ],
    'object-curly-newline': ['error', { 'multiline': true }],
    'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': ['off'], // handled by GIT
    'no-restricted-syntax': [
      'error',
      { selector: 'ForInStatement', message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.', },
      { selector: 'LabeledStatement', message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.', },
      { selector: 'WithStatement', message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.', },
    ],
    'vue/html-closing-bracket-spacing': ['error', { 'selfClosingTag': 'never' }],
    'vue/no-v-html': ['off'],
    'vue/max-attributes-per-line': ['warn', { 'singleline': { 'max': 10 } }],
    'vue/singleline-html-element-content-newline': ['off'],

    "unicorn/filename-case": [
      "error",
      {
        "case": "kebabCase"
      }
    ]
  },
  overrides: [{ 'files': ['**/*.spec.{j,t}s?(x)'], 'env': { 'jest': true } }]
};
