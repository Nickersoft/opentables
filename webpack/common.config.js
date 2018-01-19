const webpack = require('webpack');

module.exports = {
  output: {
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(yaml|yml)?$/,
        use: ['json-loader', 'yaml-loader']
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      }
    ]
  }
};
