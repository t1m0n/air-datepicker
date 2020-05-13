const webpack = require('webpack');
const path = require('path');
const dev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');


//  Plugins
// -------------------------------------------------

let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV).toLowerCase()
        }
    }),
    new HtmlWebpackPlugin({
        template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
];

//  Entry
// -------------------------------------------------

let entry = {
    index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', './index.js'],
};

if (!dev) {
    entry.index = './index.js';
}

//  Config
// -------------------------------------------------
let config = {
    mode: dev ? 'development' : 'production',
    entry: entry,
    devtool: dev ? 'eval-source-map' : 'none',
    watch: dev,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                ['@babel/plugin-proposal-class-properties', {loose: true}],
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {sourceMap: dev}},
                    {loader:'postcss-loader', options: {sourceMap: dev}},
                    {loader: 'sass-loader', options: {sourceMap: dev}},
                ]
            },
        ]
    },
    resolve: {
        modules: [`${__dirname}/src/js`, `${__dirname}/src`, 'node_modules']
    },
    plugins: plugins,
};

if (dev) {
    config.devServer = {
        contentBase: './dist',
        hot: true
    };
}

module.exports = config;
