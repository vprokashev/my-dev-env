const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getRules } = require('./get-rules');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function (projectRoot, settings) {
  return {
    context: settings.WEBPACK_CONTEXT,
    mode: process.env.NODE_ENV,
    name: 'web',
    target: 'web',
    devtool: false,
    node: false,
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserJSPlugin({})
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 60000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '-',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -10,
            filename: '[name]-[chunkhash].js'
          },
          common: {
            test: /[\\/]src[\\/]common[\\/]/, // Путь до общей логики
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: -20,
            filename: '[name]-[chunkhash].js'
          }
        }
      },
      runtimeChunk: 'single'
    },
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
    module: {
      rules: getRules(settings)
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
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
    // Use this section when developing locally with `npm link` command
    // resolveLoader: {
    //   modules: [
    //     path.join(__dirname, '..', './node_modules')
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
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: settings.REPORT_TARGET,
        openAnalyzer: false
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: {
          configFile: settings.TS_CONFIG_PATH
        }
      })
    ]
  };
};
