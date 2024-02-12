const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externals: [nodeExternals()],
  entry: path.join(__dirname, 'src', 'server.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}