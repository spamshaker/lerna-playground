module.exports = {
  plugins: [
    'react',
    'react-hooks',
    'testing-library',
    'jest',
    'import',
    'prettier',
    'jsx-a11y',
    'sort-destructure-keys'
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
    'jest/globals': true
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    },
    'import/extensions': ['.js', '.jsx'],
    jest: {
      version: require('jest/package.json').version
    }
  },
  rules: {
    'no-console': 2,
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
        trailingComma: 'none',
        semi: true
      }
    ],
    'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: false }],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
          typescript: {
            project: ['packages/*/tsconfig.json', 'dev/*/tsconfig.json', 'tsconfig.json']
          }
        }
      },
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended', // removes redundant warnings between TS & ESLint
        'plugin:@typescript-eslint/recommended' // rules specific to typescript, e.g., writing interfaces
      ]
    }
  ]
};
