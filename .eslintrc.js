module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  settings: {
    react: {
      version: '18'
    }
  },
  rules: {
    quotes: [ 'error', 'single' ],
    semi: [ 'error', 'always' ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-filename-extension': [ 1, { 'extensions': [ '.js', '.jsx', '.ts', '.tsx' ] } ],
    indent: [ 'error', 2, { SwitchCase: 1 } ],
    'space-before-function-paren': 0,
    'react/prop-types': 0,
    'react/jsx-handler-names': 0,
    'react/jsx-fragments': 0,
    'react/jsx-no-useless-fragments': 0,
    'react/jsx-tag-spacing': [ 'error', {
      'closingSlash': 'never',
      'beforeSelfClosing': 'never',
      'afterOpening': 'never',
      'beforeClosing': 'never'
    } ],
    'react/no-unused-prop-types': 0,
    'import/export': 0,
    'jsx-quotes': [ 'error', 'prefer-single' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'computed-property-spacing': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'never' ],
    'standard/no-callback-literal': 0,
    'camelcase': 'warn',
    'prefer-promise-reject-errors': 0,
    'multiline-ternary': [ 'error', 'always' ],
    '@typescript-eslint/semi': [ 'error', 'always' ],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [ 'warn', { 'argsIgnorePattern': '^_' } ],
    '@typescript-eslint/no-var-requires': 0
  }
};
