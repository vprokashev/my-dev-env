const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const history = require('connect-history-api-fallback');

module.exports = function (config, settings) {
  const app = express();
  const compiler = webpack(config);
  const devMiddleware = webpackDevMiddleWare(compiler, {
    publicPath: settings.WEBPACK_PUBLIC_PATH,
    index: 'index.html',
    stats: {
      all: false,
      colors: true,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      assets: true
    },
    serverSideRender: true
  });
  app.set('port', settings.DEV_PORT);
  if (settings.STATIC_RESOURCE_PATH) {
    app.use('/static', express.static(settings.STATIC_RESOURCE_PATH));
  }
  if (settings.stub && settings.stub.PATH && settings.stub.ROUTER) {
    app.use(settings.stub.PATH, settings.stub.ROUTER);
  }
  app.use(history({
    index: '/index.html'
  }));
  app.use(devMiddleware);
  return app;
};
