const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
      test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new ESLintPlugin({
      extensions: ['js']
    })
  ]
};
