const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  name: "client",
  target: "web",
  entry: "./src/client.jsx",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract([
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [autoprefixer()]
            }
          },
          {
            loader: "sass-loader"
          }
        ])
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              name: "[name].[hash:6].[ext]",
              outputPath: "images/"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                enabled: false
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ExtractTextPlugin("bundle.[hash:6].css"),

    new BrowserSyncPlugin({
      host: 'localhost',
      port: 4000,
      server: { baseDir: ['dist'] }
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack React Starter',
      filename: './index.html',
      template: './src/index.html'
    })

  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
