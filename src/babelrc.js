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
        '@babel/preset-env',
        {
          targets: {
            browsers: '> 0.5%, not IE 11, not dead'
          },
          // Use @babel/plugin-transform-runtime for polyfills
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
