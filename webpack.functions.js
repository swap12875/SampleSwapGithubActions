const nodeExternals = require('webpack-node-externals');

module.exports = {
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: { node: '18' } }]]
          }
        }
      }
    ]
  },
  output: {
    path: __dirname + '/functions-build',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  }
};
