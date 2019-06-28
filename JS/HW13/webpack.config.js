const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    entry: { main: './src/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'sass-loader']
        },
        {
        test: /\.(png|jpe?g|gif)$/,
        use:  'file-loader'
        },
        { test: /\.hbs$/,
         exclude: /node_modules/,
         use: ["handlebars-loader"],
        }
    ]
    },
    plugins: [ 
        new CleanWebpackPlugin (),
        new HtmlWebpackPlugin({
          inject: false,
          hash: true,
          template: './src/index.html',
          filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'style.css',
            // chunkFilename: '[id].css',
          }),
      ]
}