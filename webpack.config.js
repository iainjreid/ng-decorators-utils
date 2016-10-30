module.exports = {
  entry: './source/index.js',
  output: {
    path: 'dist',
    filename: 'ng-decorators-utils.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
