module.exports = {
  root: true,
  env: { node: true },
  parser: '@typescript-eslint/parser',
  extends: ["custom"],
  rules: {
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
}
