# Jest 29

Install requirements
```shell
npm i @babel/preset-env \
@testing-library/jest-dom \
babel-jest \
@types/jest \
jest \
jest-environment-jsdom
```

Init config (optional)
```shell
jest --init
```

jest.config.js in the project root
```js
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  coverageReporters: [
    'lcov'
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'babel-jest', {
        presets: [
          [ '@babel/preset-env', { targets: { node: 'current' } } ],
          '@babel/preset-typescript',
          [ '@babel/preset-react', { runtime: 'automatic' } ]
        ]
      }
    ]
  }
};

export default config;
```

test-utils.ts
```js
import React, { ReactElement, useMemo } from 'react';
import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const router = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: children
    }
  ]), []);
  return (
    <RouterProvider router={ router }/>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

```

Test example
```shell
import React from 'react';
import { render } from '../../../test-utils';
import { Form } from './form';

test('loads and displays greeting', async () => {
  const { container } = render(<Form/>);
  expect(container.querySelector('form [name="title"]')).toBeInTheDocument();
});

```
