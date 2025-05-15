module.exports = {
  resolve: {
    fallback: {
      events: require.resolve('events/'),
      path: require.resolve('path-browserify'),
      util: require.resolve('util/'),
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      assert: require.resolve('assert/'),
      os: require.resolve('os-browserify/browser')
    }
  }
};
