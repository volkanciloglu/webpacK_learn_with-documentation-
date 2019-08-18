const path = require("path")
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "./"
  },
  mode: "development",
  module: {
    rules: [{
      test: /\.(png|jpg)$/,
      use: {
        loader: "file-loader"
      }
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }, {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    }, {
      test: /\.js$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    })
  ]
}