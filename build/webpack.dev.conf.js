var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

var config = require('../config');
var webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
  devtool: 'eval-source-map', // source-map

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),

    // 定义全局变量
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    }),
    // 编译html
    // new HtmlWebpackPlugin({
    //   filename: 'index.html', //new 目标编译出的文件的文件名
    //   template: 'index.html', //new 一个这个插件的实例，并传入相关的参数
    //   title: 'demo',
    //   inject: true // 是否把js文件插入到body的最后
    // }),
    new HtmlWebpackPlugin({
      filename: 'a.html', //new 目标编译出的文件的文件名
      template: './src/a.html', //new 一个这个插件的实例，并传入相关的参数
      chunks: ['a'],
      inject: true, // 是否把js文件插入到body的最后
      title: 'a'
    }),
    new HtmlWebpackPlugin({
      filename: 'b.html', //new 目标编译出的文件的文件名
      template: './src/b.html', //new 一个这个插件的实例，并传入相关的参数
      chunks: ['b'],
      inject: true, // 是否把js文件插入到body的最后
      title: 'b'
    }),
    // extra style.css 引入
    new MiniCssExtractPlugin({
      filename: path.posix.join('assets', 'css/[name].[contenthash:7].css')
    }),
    //热加载插件
    new webpack.HotModuleReplacementPlugin()
  ]
})
