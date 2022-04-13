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
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '+(@database|@entities|@utils|@handlers|@tests)/**',
            group: 'internal',
            // position: 'before',
          },
          {
            pattern: '+(@database|@entities|@utils|@handlers|@tests)',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
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
