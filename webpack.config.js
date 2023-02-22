const path = require('path');

module.exports = {
  entry: './src',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'swc-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};
