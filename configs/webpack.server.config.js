const path = require('path');
const nodeExternals = require('webpack-node-externals');
const PostCssPreset = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isModeDev = mode === 'development';

module.exports = {
  target: 'node',
  entry: path.resolve(__dirname, '../src/server/server.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].[contenthash].js'
  },
  mode,
  externals: [nodeExternals()],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src/server')
    }
  },
  plugins: [new CleanWebpackPlugin()],
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
      }
    ]
  },
  optimization: {
    minimize: false
  }
};
