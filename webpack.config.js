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
      contentBase: path.resolve(__dirname, './src'),
      historyApiFallback: true,
      port: 3000,
      open: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
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

    devtool: isProd ? 'source-map' : 'inline-source-map',

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

    resolve: {
      alias: {
        Components: path.resolve(__dirname, 'src/components/'),
        Redux: path.resolve(__dirname, 'src/redux/'),
      },
    },
  };
};
