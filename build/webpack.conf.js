var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin@next'); // css文件提取
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
var HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(_path) {
  return path.posix.join(__dirname, _path);
}

module.exports = {
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    path: resolve('dist'),
    filename: 'assets/js/[name].[hash:7].js'
  },

  devtool: 'eval-source-map',

  devServer: {
    contentBase: "./", // 本地服务器所加载的页面所在的目录
    port: 8888,
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    hot: true // 开启热重载
  },

  optimization: {
    minimizer: [
      // js mini
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      // css mini
      new OptimizeCssAssetsPlugin({})
    ]
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader'
        }]
      })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader'
        }, {
          loader: 'less-loader'
        }]
      })
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

  plugins: [
    // js压缩
    // new webpack.optimize.UglifyJsPlugin(),
    // css压缩
    // new OptimizeCssAssetsPlugin(),
    // css分离
    new ExtractTextPlugin({
      filename: path.posix.join('assets', 'css/[name].[contenthash:7].css')
    }),
    // html 编译
    new HtmlWebpackPlugin({
      filename: 'index.html', //new 目标编译出的文件的文件名
      template: 'index.html', //new 编译后的html的路径，相对目录是dist文件夹
      inject: true // 是否把js文件插入到body的最后
    }),
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),
    // 定义全局变量
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    })
  ],

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      "@": resolve('src'),
      "@static": resolve('static'),
      '@cfg': resolve('src/config')
    }
  }
}