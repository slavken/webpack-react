const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].[contenthash].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        hot: true,
        port: 9000,
        open: {
            app: [
                'Chrome',
                '--incognito'
            ]
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[contenthash].[ext]',
                    outputPath: 'static/media'
                }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash].css',
            chunkFilename: 'static/css/[id].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}