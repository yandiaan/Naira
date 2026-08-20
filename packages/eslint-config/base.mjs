import tseslint from 'typescript-eslint';

export default tseslint.config(tseslint.configs.recommendedTypeChecked, {
  files: ['**/*.{js,mjs,cjs,ts}'],
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    eqeqeq: ['error', 'always'],
    curly: ['error', 'multi-line'],
  },
});
