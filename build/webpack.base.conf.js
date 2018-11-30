// 共有配置项
var path = require('path');

function resolve(url) {
  return path.join(__dirname, '..', url);
}

module.exports = {
  // entry: {
  //   main: resolve('src/main.js')
  // },
  entry: [resolve('src/main.js'), resolve('src/css-entry.js')],

  output: {
    path: resolve('dist'),
    filename: path.posix.join('assets', 'js/[name].js')
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      },
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('assets', 'img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('assets', 'fonts/[name].[hash:7].[ext]')
      }
    }]
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@static': resolve('static'),
      '@cfg': resolve('src/config')
    }
  }
}