function getBabelRcOptions() {
  return {
    babelrc: false,
    cacheDirectory: true,
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
          helpers: true,
          regenerator: true,
          useESModules: true
        }
      ]
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: '> 0.25%, not dead',
          useBuiltIns: false
        }
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic'
        }
      ],
      '@babel/preset-typescript'
    ]
  };
}

module.exports = {
  getBabelRcOptions
};
