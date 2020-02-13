const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

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
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: isProd
      ? [
          new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
          }),
          new CompressionPlugin({
            filename: '[path].br[query]',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg)$/,
            compressionOptions: { level: 11 },
            threshold: 10240,
            minRatio: 0.8,
          }),
          new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
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
        '#Components': path.resolve(__dirname, 'src/components/'),
        '#Styles': path.resolve(__dirname, 'src/styles/'),
        '#Root': path.resolve(__dirname, 'src/'),
      },
    },
  };
};
