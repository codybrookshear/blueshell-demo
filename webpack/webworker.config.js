const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        entry: './src/webworker-worker.ts',
        target: 'webworker',
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ],
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
            filename: 'worker-bundle.js',
            path: path.resolve(__dirname, 'dist'),
            //clean: true,
        },
    },
    {
        entry: './src/webworker-web.ts',
        target: 'web',
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Blueshell Webworker Demo',
            }),
        ],
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
            filename: 'bundle.js',
            path: path.resolve(__dirname, '../dist'),
            clean: true,
        },
        devServer: {  // ONLY PUT IN A SINGLE CONFIG. NOT EACH CONFIG IN modlue.exports array
            static: {
              directory: path.join(__dirname, '../dist'),
            },
            port: 9000,
            open: true,
        },
    },
];
