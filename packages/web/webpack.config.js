const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV !== 'production'

const buildVersion = `${Date.now()}`

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: [
      './app/index.tsx',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          projectReferences: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'shared': path.resolve(__dirname, '../shared/dist'),
      react: path.resolve(__dirname, '..', '..', 'node_modules', 'react'),
      'react-dom': path.resolve(__dirname, '..', '..', 'node_modules', 'react-dom'),
    },
  },
  devtool: isDev ? 'inline-source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    isDev ? new webpack.HotModuleReplacementPlugin() : null,
    new webpack.DefinePlugin({
      BUILD_VERSION: isDev ? 1 : buildVersion,
      PATH: isDev ? '"/"' : '"/exif-editor/"',
      IS_DEV: isDev,
    }),
  ].filter(Boolean),
  devServer: {
    hotOnly: true,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
}
