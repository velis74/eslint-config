module.exports = {
  root: true,
  env: { 'node': true },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    '@vue/airbnb'
  ],
  plugins: ['es'],
  parserOptions: { 'parser': 'babel-eslint' },
  rules: {
    'max-len': ['error', { 'code': 120 }],
    'no-console': 'off',
    'no-plusplus': 'off',
    'sort-imports': 'off', // taken care of by vue plugin
    'import/extensions': ['error', 'always', { 'js': 'never', 'vue': 'never' }],
    'import/order': [
      'error', { 'newlines-between': 'always', 'alphabetize': { 'order': 'asc', 'caseInsensitive': true } }
    ],
    'indent': ['error', 2, { 'MemberExpression': 1 }],
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
    'vue/html-closing-bracket-spacing': ['error', { 'selfClosingTag': 'never' }],
    'vue/no-v-html': ['off'],
    'vue/max-attributes-per-line': ['warn', { 'singleline': { 'max': 10 } }],
    'vue/singleline-html-element-content-newline': ['off']
  },
  overrides: [{ 'files': ['**/*.spec.{j,t}s?(x)'], 'env': { 'jest': true } }]
};
