var path = require('path')

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'assets/javascripts'),
  entry: './base.js',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: '/node_modules/'
    }]
  },
  output: {
    filename: 'public/javascripts/base.js'
  }
}
