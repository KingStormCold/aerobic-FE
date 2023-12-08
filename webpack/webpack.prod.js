const webpack = require('webpack');
const webpackMerge = require('webpack-merge').merge;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const sass = require('sass');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'production';

module.exports = async () =>
  webpackMerge(await commonConfig({ env: ENV }), {
    // devtool: 'source-map', // Enable source maps. Please note that this will slow down the build
    mode: ENV,
    entry: {
      main: './src/main/webapp/app/index',
    },
    output: {
      path: utils.root('target/classes/static/'),
      filename: `app/[name].bundle.js?v=${Date.now()}`,
      chunkFilename: `app/[id].chunk.js?v=${Date.now()}`,
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
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
    optimization: {
      runtimeChunk: false,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          // sourceMap: true, // Enable source maps. Please note that this will slow down the build
          terserOptions: {
            ecma: 6,
            toplevel: true,
            module: true,
            compress: {
              warnings: false,
              ecma: 6,
              module: true,
              toplevel: true,
            },
            output: {
              comments: false,
              beautify: false,
              indent_level: 2,
              ecma: 6,
            },
            mangle: {
              keep_fnames: true,
              module: true,
              toplevel: true,
            },
          },
        }),
        new CssMinimizerPlugin({
          parallel: true,
        }),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
        // If this URL is left empty (""), then it will be relative to the current context.
        // If you use an API server, in `prod` mode, you will need to enable CORS
        // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
        // for preprod::
         'process.env.SERVER_API_URL': `'https://mrbang.vn/'`,
        }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        filename: 'content/[name].[contenthash].css',
        chunkFilename: 'content/[name].[chunkhash].css',
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        exclude: [/swagger-ui/],
      }),
    ],
  });
