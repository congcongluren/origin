// yarn add webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc -D
// @babel/plugin-transform-typescript
// yarn add babel-loader @babel/core @babel/preset-env @babel/preset-typescript url-loader file-loader html-webpack-plugin css-loader sass-loader style-loader sass -D
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'main.ts'),
  output: {
    path: path.resolve(__dirname, '../website-dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue']
  },
  module: {
    rules: [
      { test: /\.(ts|js)x?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.(svg|otf|ttf|woff|woff2|eot|git|png)$/, loader: 'url-loader' },
      { test: /\.(scss|csss)/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html')
    }),
  ]
}