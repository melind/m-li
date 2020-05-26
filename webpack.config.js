const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
              
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              }
        ]
    },
    devServer: {
        contentBase: './dist',
        overlay: true,
        hot: true
    },
    plugins: [
       new CopyWebpackPlugin({
      patterns: [
      
        { from: 'index.html', to: 'index.html' },
      ],
    }),
        new webpack.HotModuleReplacementPlugin()
    ]
};