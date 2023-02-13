const path = require('path');
const PostCssPreset = require('postcss-preset-env');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isModeDev = mode === 'development';

const target = isModeDev ? 'web' : 'browserslist';
const devtool = isModeDev ? 'source-map' : false;

module.exports = {
  entry: path.resolve(__dirname, '../src/client', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    publicPath: '/',
    clean: true,
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    static: {
      directory: path.resolve(__dirname, '../dist')
    },
    historyApiFallback: { index: '/', disableDotRule: true },
    open: true,
    hot: isModeDev
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src/client')
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          isModeDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [PostCssPreset]
              }
            }
          },
          'sass-loader'
        ],
        generator: {
          filename: 'assets/styles/[hash][ext][query]'
        }
      },
      {
        test: /\.(?:ico|jpe?g|png|svg|webp|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/img/[hash][ext][query]'
        }
      },
      {
        test: /\.woff(2)?|ttf$/,
        type: 'asset',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
