const webpack = require("webpack");
const ngcWebpack = require("ngc-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require("path");

var _root = path.resolve(__dirname, ".");

function getRoot(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = function(env, argv) {
  return {
    mode: env.production ? 'production' : 'development',

    entry: {
      app: "./src/main.ts",
      polyfills: "./src/polyfills.ts"
    },

    target: "web",
    
    devtool: env.production ? false : "inline-source-map",

    output: {
      path: getRoot("dist"),
      publicPath: "/",
      filename: "[name].js"
    },

    resolve: {
      extensions: [".js", ".ts", ".html"]
    },

    module: {
      rules: [
        {
          test: /.js$/,
          parser: {
            system: true
          }
        },
        // Typescript
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: "@ngtools/webpack"
        },
        // Templates
        {
          test: /\.html$/,
          exclude: getRoot("src", "index.html"),
          use: [
            {
              loader: "raw-loader"
            }
          ]
        },

        {
          test: /\.scss$/,
          include: getRoot("src", "app"),
          use: ["raw-loader", "sass-loader"]
        },

        {
          test: /\.scss$/,
          exclude: getRoot("src", "app"),
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }
      ]
    },
    plugins: [
      new ngcWebpack.NgcWebpackPlugin({
        tsConfigPath: "./tsconfig.json",
        mainPath: "./src/main.ts"
      }),

      new MiniCssExtractPlugin({
        filename: "app.css"
      }),

      new CopyWebpackPlugin([
        {
          from: getRoot("src", "index.html"), to: getRoot("dist", "index.html")
        },
        { 
          from: getRoot("src", "assets"), to: getRoot("dist", "assets") 
        }
       
      ]),

      
    ]
  };
};
