function getBabelRcOptions() {
  return {
    babelrc: false,
    cacheDirectory: true,
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3
        }
      ]
    ],
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic'
        }
      ]
    ]
  };
}
module.exports = {
  getBabelRcOptions
};
