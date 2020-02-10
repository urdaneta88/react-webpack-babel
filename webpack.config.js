const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '/build'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: './build',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
      ],
    },
    plugins: isProd
      ? [
          new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
          }),
        ]
      : [
          new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
          }),
          new BundleAnalyzerPlugin(),
        ],

    devtool: isProd ? '' : 'inline-source-map',

    performance: {
      hints: isProd ? false : 'warning',
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
};
