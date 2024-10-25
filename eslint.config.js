import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ), {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: '18'
      }
    },
    rules: {
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-empty-interface': 0,
      '@typescript-eslint/no-unused-vars': [
        'warn', {
          argsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-require-imports': 0,
      'array-bracket-spacing': [ 'error', 'always' ],
      camelcase: 'warn',
      'comma-dangle': [ 'error', 'never' ],
      'computed-property-spacing': [ 'error', 'always' ],
      'import/export': 0,
      indent: [
        'error', 2, {
          SwitchCase: 1
        }
      ],
      'jsx-quotes': [ 'error', 'prefer-single' ],
      'multiline-ternary': [ 'error', 'always' ],
      'no-unused-vars': 0,
      'object-curly-spacing': [ 'error', 'always' ],
      'prefer-promise-reject-errors': 0,
      quotes: [ 'error', 'single' ],
      'react/jsx-filename-extension': [
        1, {
          extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
        }
      ],
      'react/jsx-fragments': 0,
      'react/jsx-handler-names': 0,
      'react/jsx-no-useless-fragments': 0,
      'react/jsx-tag-spacing': [
        'error', {
          closingSlash: 'never',
          beforeSelfClosing: 'never',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ],
      'react/jsx-uses-react': 'off',
      'react/no-unused-prop-types': 0,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 'off',
      semi: [ 'error', 'always' ],
      'space-before-function-paren': 0,
      'standard/no-callback-literal': 0
    }
  }
];
