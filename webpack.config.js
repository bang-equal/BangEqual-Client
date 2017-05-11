var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.less',
    './src/index',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/',
      filename: 'index.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { 
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      },
      // Images: png, gif, jpg, jpeg
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        loader: 'url-loader?name= ./assets/images/[name].[ext]?limit=8192'  // inline base64 URLs for <=8k images, direct URLs for the rest
      },
    ]
  },
  devServer: {
    contentBase: "./src"
  }
};
