const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const generalConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback : { 
        "util": require.resolve("util/"),
        "inspector": false 
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

const nodeConfig = {
    entry: { node: './src/node.ts' },
    target: 'node',
};

const webworkerConfig = {
    entry: { 
        'behavior-tree': './src/behavior-tree.ts',
    },
    target: 'webworker',
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};

const browserConfig = {
    entry: { 
        browser: './src/browser.ts',
    },
    target: 'web',
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new HtmlWebpackPlugin({
            title: 'Blueshell Demo',
        })
    ],
    output: {
        clean: true
    },
};

Object.assign(nodeConfig, generalConfig);
Object.assign(browserConfig, generalConfig);
Object.assign(webworkerConfig, generalConfig);

module.exports = [nodeConfig, webworkerConfig, browserConfig];