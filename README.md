# my-dev-env
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

package.json
```json
"start": "my-dev-server --mode development",
"build": "my-dev-server --mode production",
```
