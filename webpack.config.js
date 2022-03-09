const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: { filename: "main.js" },
  plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "sass-loader",
        ],
      },
    ],
  },
};
