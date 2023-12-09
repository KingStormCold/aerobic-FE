const webpack = require('webpack');
const webpackMerge = require('webpack-merge').merge;
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const sass = require('sass');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = async options =>
  webpackMerge(await commonConfig({ env: ENV }), {
    devtool: 'cheap-module-source-map', // https://reactjs.org/docs/cross-origin-errors.html
    mode: ENV,
    entry: ['./src/main/webapp/app/index'],
    output: {
      path: utils.root('target/classes/static/'),
      filename: `app/[name].bundle.js?v=${Date.now()}`,
      chunkFilename: `app/[id].chunk.js?v=${Date.now()}`,
    },
    optimization: {
      moduleIds: 'named',
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: { implementation: sass },
            },
          ],
        },
      ],
    },
    devServer: {
      hot: true,
      static: {
        directory: './target/classes/static/',
      },
      port: 9000,
      proxy: [
        {
          context: [
            '/api',
            '/services',
            '/management',
            '/swagger-resources',
            '/v2/api-docs',
            '/v3/api-docs',
            '/h2-console',
            '/auth',
            '/v1',
          ],
          target: `http${options.tls ? 's' : ''}://localhost:8000`,
          secure: false,
          changeOrigin: options.tls,
        },
      ],
      https: options.tls,
      historyApiFallback: true,
    },
    stats: process.env.JHI_DISABLE_WEBPACK_LOGS ? 'none' : options.stats,
    plugins: [
      new webpack.DefinePlugin({
        'process.env.SERVER_API_URL': `'http://localhost:8000'`,
      }),
    ]
  });
