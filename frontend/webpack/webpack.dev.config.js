var webpack = require('webpack');
var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

var parentDir = path.join(__dirname, '../');

module.exports = {
    entry: [
        path.join(parentDir, 'index.js')
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader:['style-loader', 'css-loader']
            },
            {
                test: /\.(scss)$/,
                use: [
                    {loader: 'style-loader'}, // Adds CSS to the DOM by injecting a `<style>` tag
                    {loader: 'css-loader'}, // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    {
                        loader: 'postcss-loader', // Loader for webpack to process CSS with PostCSS
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {loader: 'sass-loader'} // Loads a SASS/SCSS file and compiles it to CSS
                ]
            },
            {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./index.html",
        filename: "./index.html"
      })
    ],
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    }
}