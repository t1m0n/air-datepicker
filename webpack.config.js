const webpack = require('webpack');
const path = require('path');
const dev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NAME = 'air-datepicker';

//  Plugins
// -------------------------------------------------

let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV).toLowerCase()
        }
    }),
    new HtmlWebpackPlugin({
        template: './index-dev.html'
    }),
];

let buildPlugins = [
    new MiniCssExtractPlugin({
        filename: `${NAME}.css`,
    }),
];

//  Entry
// -------------------------------------------------

let entry = {
    index: './index-dev.js',
};

if (!dev) {
    entry.index = './src/datepicker.js';
}

//  Config
// -------------------------------------------------
let config = {
    mode: dev ? 'development' : 'production',
    entry: entry,
    devtool: dev ? 'eval-source-map' : false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: dev ? 'js/[name].js' : `${NAME}.js`,
        publicPath: '/',
        chunkFilename: 'js/[name].js',
        library: dev ? undefined : 'AirDatepicker',
        libraryTarget: dev ? undefined : 'umd',
        libraryExport: dev ? undefined : 'default',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)|dist/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: dev}},
                    {loader:'postcss-loader', options: {sourceMap: dev}},
                    {loader: 'sass-loader', options: {sourceMap: dev}},
                ]
            },
        ]
    },
    resolve: {
        modules: [`${__dirname}/src/js`, `${__dirname}/src`, `${__dirname}/dist`, 'node_modules']
    },
    plugins: dev ? plugins : buildPlugins,
};

if (dev) {
    config.devServer = {
        hot: true
    };
}

module.exports = config;
