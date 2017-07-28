var webpack = require("webpack");
var path = require("path");

module.exports = {
    context: __dirname + "/public",
    entry: "./js/entry.js",
    module: {
        loaders: [
            {
                test:/\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-0"],
                    plugins: ["transform-decorators-legacy", "react-require"]
                    }
            },
            {
              test: /\.json$/,
              loader: 'json-loader',
            },
            {
                test:/\.css$/,
                use:["style-loader", "css-loader"]
            }
        ]
    },
    externals: {
      'jsdom': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "./public/")
    },
    devServer: {
        inline: true,
        hot: true
    }
};