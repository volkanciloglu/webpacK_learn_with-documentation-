const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle-[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "./"
  },
  mode: "production",
  module: {
    rules: [{
      test: /\.(png|jpg)$/,
      use: {
        loader: "file-loader"
      }
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    }, {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
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
    new MiniCssExtractPlugin({
      filename: "styles-[contenthash].css"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    })
  ]
}