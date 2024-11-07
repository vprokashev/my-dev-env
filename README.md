# my-dev-env
![ESLint](https://github.com/vprokashev/my-dev-env/actions/workflows/eslint.yml/badge.svg)

settings.js example
```js
const path = require('path');

module.exports = {
  STATIC_RESOURCE_PATH: path.join(__dirname, './static'),
  WEBPACK_PUBLIC_PATH: '/',
  WEBPACK_PATH: path.join(__dirname, './tmp/'),
  WEBPACK_CONTEXT: path.join(__dirname, './web-client'),
  WEBPACK_BUNDLE_ENTRY: './index.tsx',
  TS_CONFIG_PATH: path.join(__dirname, './tsconfig.json'),
  DEV_PORT: '2023',
  REPORT_TARGET: path.join(__dirname, './tmp/report.html'),
  stub: {
    ROUTER: null,
    PATH: '/api/v1'
  },
  public: {
    API_PATH: '\'/api/v1\''
  }
};
```

package.json scripts
```json
{
  "scripts": {
    "start": "my-dev-server --mode development",
    "build": "my-dev-server --mode production"
  }
}
```
package.json dependencies
```json
{
  "dependencies": {
    "my-dev-env": "github:vprokashev/my-dev-env#v2"
  }
}
```
eslint (eslint.config.js)
```js
import { default as myDevEnvConfig } from 'my-dev-env/eslint.config.js';

export default [
  ...myDevEnvConfig,
  {
    ignores: [
      'eslint.config.js',
      'node_modules/*',
      'tmp/*'
    ]
  }
];

```
router
```js
const router = require('express').Router();
const { errorHandler } = require('./middleware/error-handler');

router
  .use('/path', require('./path'))
  .use(errorHandler);

module.exports = router;
```
import styles
```js
import './style/index.scss';
import * as style from './product.module.scss';
```
