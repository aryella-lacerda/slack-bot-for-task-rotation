module.exports = {
  env: {
    es2021: true,
    jest: true,
  },
  extends: [
    'standard',
    'prettier', // prettier should come last
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    // 'import/resolver': {
    //   typescript: {},
    // },
  },
  rules: {
    camelcase: 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
}
