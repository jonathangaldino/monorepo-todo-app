module.exports = {
  extends: [
    "turbo",
    "prettier"
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
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
};
