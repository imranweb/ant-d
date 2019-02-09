const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdScssThemePlugin = require('antd-scss-theme-plugin');
const path = require('path');
const isProd = process.env.NODE_ENV === 'prod';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: !isProd,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProd,
              modules: true,
              camelCase: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
            },
          },
          AntdScssThemePlugin.themify({
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd,
            },
          }),
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: !isProd,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProd,
            },
          },
          AntdScssThemePlugin.themify('less-loader'),
        ],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new AntdScssThemePlugin(path.join(__dirname, 'src', 'theme.scss')),
  ],
  mode: "development"
}