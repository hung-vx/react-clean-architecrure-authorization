module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    react: {
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      {
        property: 'freeze',
        object: 'Object',
      },
      {
        property: 'myFavoriteWrapper',
      },
    ],
    linkComponents: [
      'Hyperlink',
      {
        name: 'Link',
        linkAttribute: 'to',
      },
    ],
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 0,
    'react-hooks/rules-of-hooks': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'no-param-reassign': 0,
    'react/jsx-pascal-case': 0,
    camelcase: 0,
    '@typescript-eslint/lines-between-class-members': 0,

    'prettier/prettier': [
      1,
      {
        arrowParens: 'avoid',
        semi: false,
        trailingComma: 'es5',
        endOfLine: 'lf',
        singleQuote: true,
        tabWidth: 2,
        printWidth: 120,
        useTabs: false,
      },
    ],
    'no-console': 1,
    'no-use-before-define': 1,
    'object-curly-spacing': [1, 'always'],
    'no-unused-expressions': [2, { allowTernary: true, allowShortCircuit: true }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'key-spacing': [
      2,
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
        },
        // multiLine: {
        //   beforeColon: true,
        //   afterColon: true,
        //   align: 'colon',
        // },
      },
    ],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    'space-before-blocks': 'error',

    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': [2],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      typescript: {},
    },
  },
  globals: {
    arguments: true,
  },
}

// https://www.carlrippon.com/creating-react-and-typescript-apps-with-webpack/
// https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
