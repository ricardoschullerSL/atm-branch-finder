var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require("path");

module.exports = {
    context: __dirname + "/public",
    entry: "./js/main.js",
    module: {
        loaders: [
            {
                test:/\.js?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015"],
                    
                }
            },
            {
                test:/\.css$/,
                use:["style-loader", "css-loader"]
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./public/")
    },
    devServer: {
        inline: true,
        hot: true
    }
};