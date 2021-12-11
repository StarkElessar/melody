const path                    = require('path')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const HTMLWebpackPlugin       = require('html-webpack-plugin')
const CopyPlugin              = require('copy-webpack-plugin')
const MiniCssExtractPlugin    = require("mini-css-extract-plugin")

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const getFileName = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`


module.exports = {
  context: path.resolve(__dirname, 'src'), // source folder
  mode: 'development', // default mode - developer mode
  entry: ['@babel/polyfill', './index.js'], // the entry point where the main index.js file is located
  output: { // output point, where the main index.js file exits
    path: path.resolve(__dirname, 'dist'),
    filename: getFileName('js'), // destination file name
    assetModuleFilename: 'assets/[name][ext][query]',
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@fonts': path.resolve(__dirname, 'assets/fonts')
    },
  },

  devtool: isDev ? 'source-map' : false,
  watchOptions: {
    ignored: '**/node_modules',
  },
  devServer: {
    static: path.join(__dirname, '/'),
    port: 3000,
    hot: isDev
  },

  plugins: [ // an array of plugins used in the webpack assembly
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      scriptLoading: 'blocking',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd, 
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.png'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: getFileName('css')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext][query]",
        },
      },
    ],
  },
}