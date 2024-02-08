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
  THEME_CORE: '/styles/core',
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
"start": "my-dev-server --mode development",
"build": "my-dev-server --mode production",
```
package.json dependencies
```json
"my-dev-env": "github:vprokashev/my-dev-env",
```
eslint
```js
module.exports = {
  'extends': [ './node_modules/my-dev-env/.eslintrc.js' ]
};
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
