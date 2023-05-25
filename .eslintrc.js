module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import',
    'eslint-plugin-tsdoc',
  ],
  ignorePatterns: [
    'bin',
    // # don't ever lint node_modules
    'node_modules',
    'types/generated.ts',
    'dist',
    'build',
    // # don't lint nyc coverage output
    'coverage',
    'bin/cli/utils/output',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-useless-catch': 'warn',
    'no-empty': 'off',
    'no-inner-declarations': 'warn',
    'no-irregular-whitespace': 'off', // Silly rule, nbsp;s are life.
    'no-empty-pattern': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/require-jsdoc': ['off', { publicOnly: true }],
    'prefer-const': 'warn',
    'no-async-promise-executor': 'off',
    'require-await': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-param': 'off',
    // Using process.exit immediatel yexceptions can prevent
    // Sentry.captureException() from actually hitting the servers.
    'no-process-exit': 'error',
    'tsdoc/syntax': 'warn',
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreIIFE: true,
      },
    ],
    // '@typescript-eslint/require-await': 'error',
    // "@typescript-eslint/explicit-function-return-type": 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-constant-condition': 'warn',
    'prefer-rest-params': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/test/**',
        '**/factories/**',
        '*.test.ts',
        '**/scripts/**',
        '**/test-suite/*',
        '**/e2e/**/*.ts',
      ],
      rules: {
        'typescript-eslint/no-explicit-any': 'off',
        'no-process-exit': 'off',
      },
    },
  ],
}
