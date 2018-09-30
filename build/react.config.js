const webpack = require('webpack')
const path = require('path')

const vendors = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'react-redux',
  'redux',
  'redux-thunk',
  'isomorphic-fetch',
];

module.exports = {
  mode: 'production',
  entry: {
    react: vendors
  },
  output: {
    path: path.resolve(__dirname, '../assets/library'),
    filename: '[name].js',
    library: '[name]',
  },
  devtool: 'hidden-source-map',
  plugins: [
    new webpack.DllPlugin({
      path: './build/reactFest.json',
      name: '[name]',
      context: __dirname
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
}
