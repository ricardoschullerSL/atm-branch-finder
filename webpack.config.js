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
    resolve: {
          root: [
            // allows us to import modules as if /src was the root.
            // so I can do: import Comment from 'components/Comment'
            // instead of:  import Comment from '../components/Comment' or whatever relative path would be
            path.resolve(__dirname, './src')
          ],
          // allows you to require without the .js at end of filenames
          // import Component from 'component' vs. import Component from 'component.js'
          extensions: ['', '.js', '.json', '.jsx']
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