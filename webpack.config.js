const path = require("path");
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = 'development';


module.exports = {
  entry: './src/index.js',
  mode: env,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/main.[fullhash:8].js',
    publicPath: ''
  },
  resolve: {
    extensions: [ '.js', '.json', '.node', '.css', '.jsx' ]
  },
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/i,
        exclude: /(node_modules)|(\.module\.s?css$)/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: 'global'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer()
                ]
              }
            }
          },
        ]
      },
      {
        test: /\.(bmp|gif|jpg|jpeg|png)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[ext]'
            }
          }
        ]
      },
      {
        exclude: /(node_modules)|(\.(js|jsx|html|scss|css|svg)$)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'static/stylesheets/[name].[hash:8].css'
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      filename: 'index.html'
    })
  ]
};