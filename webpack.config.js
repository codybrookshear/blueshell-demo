const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    
    {
        entry: './src/node.ts',
        target: 'node',
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
            path: path.resolve(__dirname, 'dist/node'),
            clean: true,
        },
    },
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
            path: path.resolve(__dirname, 'dist/webworker'),
            //clean: true,
        },
    },
    {
        entry: './src/webworker-browser.ts',
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
            path: path.resolve(__dirname, 'dist/webworker'),
            clean: true,
        },
    },
    {
        entry: './src/browser.ts',
        target: 'web',
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new HtmlWebpackPlugin({
                title: 'Blueshell Demo',
            })
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
            path: path.resolve(__dirname, 'dist/browser'),
            clean: true,
        },
    },
];
