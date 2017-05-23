
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let path = require('path');


let APP_PATH = path.resolve(__dirname, 'src');
let BUILD_PATH = path.resolve(__dirname, 'dist');
let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js'
    }),
    new HtmlWebpackPlugin({
        title: 'test',
        template: './src/test.tpl',
        filename: 'src/tpl.html',
        chunks: ['test']
    }),
    new HtmlWebpackPlugin({
        title: 'test',
        template: './src/test.tpl',
        filename: 'src/tpl2.html',
        chunks: ['test2']
    })
];

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 9999,
        inline: true,
        progress: true,
        stats: {
            colors: true
        }
    },
    entry: {
        test: './src/test.js',
        test2: './src/test2.js',
        // 基础库的大文件单独拆分
        vendor: ['vue']
    },
    output: {
        // publicPath,
        path: BUILD_PATH,
        //编译后的文件名字
        filename: '[name].[hash:8].js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.less/,
            include: APP_PATH,
            loader: 'style-loader!css-loader!less-loader'
        }
        //  单独拆分 css 文件 但是失败
        // 后期有空有空再去计较
        // {
        //     test: /\.less/,
        //     include: APP_PATH,
        //     loader: ExtractTextPlugin.extract('style-loader!css-loader!less-loader')
        // }
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
