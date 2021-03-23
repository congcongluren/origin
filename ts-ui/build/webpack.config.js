// yarn add webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc -D
// yarn add babel-loader @babel/core @babel/preset-env @babel/preset-typescript url-loader file-loader html-webpack-plugin css-loader sass-loader style-loader sass -D
const path = require('path');
const {
  VueLoaderPlugin
} = require('vue-loader')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../packages/g-ui/index.ts'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'g-ui'
  },
  externals:{
    vue:{
      root:'Vue',
      commonjs:'vue',
      commonjs2:'vue'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue']
  },
  module: {
    rules: [{
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}