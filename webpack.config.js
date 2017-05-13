var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.less',
    './src/index'
  ],
  output: {
      path: path.join(__dirname, 'dist/js'),
      filename: 'bundle.js',
      publicPath: path.join(__dirname, 'dist/js/')
  },
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
        test: /\.(png|svg|gif|ttf|jpe?g)$/,
        loader: 'url-loader?name= ./assets/images/[name].[ext]?limit=8192'  // inline base64 URLs for <=8k images, direct URLs for the rest
      }
    ]
  },
   plugins: [
    // Minify assets.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
  ]
};
