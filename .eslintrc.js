module.exports = {
  root: true,
  ignorePatterns: '**/*.js',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  settings: { react: { version: 'detect' } },
  extends: [
    // Cascading priority: each subsequent ruleset overrides overlaps in previous
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier', // Must be last: turns off any rules that prettier can handle
  ],
  rules: {
    // Allow vars like "_myVar"
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Add curlies on multi-line statements (combines with prettier)
    curly: ['error', 'multi-line'],
    // Require strict equality checking
    eqeqeq: 'error',
    // Prevent missed `await` keywords
    'require-await': 'error',
    // Prevents some real head-scratcher bugs
    'no-restricted-globals': [
      'error',
      'event',
      'name',
      'length',
      'blur',
      'onBlur',
    ],
    // This can hurt, but it prevents bugs
    'no-shadow': 'error',
  },
}
