const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getRules } = require('./get-rules');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function (projectRoot, settings) {
  return {
    context: settings.WEBPACK_CONTEXT,
    mode: process.env.NODE_ENV,
    name: 'web',
    target: 'web',
    devtool: 'inline-source-map',
    node: false,
    performance: false,
    entry: {
      bundle: [
        settings.WEBPACK_BUNDLE_ENTRY
      ]
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].chunk.js',
      publicPath: settings.WEBPACK_PUBLIC_PATH,
      path: settings.WEBPACK_PATH,
      library: '[name]'
    },
    stats: {
      all: false,
      colors: true,
      modules: true,
      errors: true,
      warnings: true,
      assets: false
    },
    module: {
      rules: getRules(settings)
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.mjs',
        '.scss',
        '.sass',
        '.json',
        '.ts',
        '.tsx'
      ],
      modules: [
        path.join(projectRoot, './node_modules')
      ],
      plugins: [
        new TsconfigPathsPlugin({ configFile: settings.TS_CONFIG_PATH })
      ]
    },
    // resolveLoader: {
    //   modules: [
    //     path.join(__dirname, '..', './node_modules'),
    //     path.join(__dirname, '../../', './node_modules')
    //   ]
    // },
    plugins: [
      new webpack.DefinePlugin({
        'global.IS_BROWSER': true,
        'process.env': {
          ...settings.public
        }
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        minify: false,
        publicPath: '/'
      }),
      new MiniCssExtractPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      new ForkTsCheckerWebpackPlugin({
        async: true,
        typescript: {
          configFile: settings.TS_CONFIG_PATH
        }
      })
    ]
  };
};
