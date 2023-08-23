const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getBabelRcOptions } = require('./babelrc');

function getRules(settings) {
  return [
    {
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: getBabelRcOptions()
        }
      ]
    },
    {
      test: /\.module\.s([ac])ss$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            injectType: 'lazyStyleTag'
          }
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]__[hash:base64:5]'
            },
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            additionalData: (content) => {
              if (settings.THEME_CORE) {
                return `@import '${ settings.THEME_CORE }/index.scss'; ${ content }`;
              }
              return content;
            },
            sassOptions: (loaderContext) => {
              const { rootContext } = loaderContext;
              const includePaths = [];
              if (settings.THEME_CORE) {
                includePaths.push(`${rootContext}${settings.THEME_CORE}`);
              }
              return {
                includePaths
              };
            }
          }
        }
      ]
    },
    {
      test: /\.(scss|sass)$/,
      exclude: /\.module.(s([ac])ss)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false
          }
        },
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: true
          }
        },
        {
          loader: 'resolve-url-loader',
          options: {
            debug: true,
            root: settings.WEBPACK_CONTEXT
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.svg/,
      type: 'asset/source'
    }
  ];
}

module.exports = {
  getRules
};
