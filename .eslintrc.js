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
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
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
    // Not needed for vite/esbuild transpilation
    'react/react-in-jsx-scope': 0,
    // Not needed with TypeScript
    'react/prop-types': 0,
    // Prevent extra tags for components without children
    'react/self-closing-comp': 'error',
    // Prevent missed `await` keywords
    'require-await': 'error',
    // Prevents some real head-scratcher bugs
    'no-restricted-globals': ['error', 'event', 'name', 'length'],
    // This can hurt, but it prevents bugs
    'no-shadow': 'error',
  },
}
