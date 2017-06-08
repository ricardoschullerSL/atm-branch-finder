// This config file is commented out because mocha-webpack only works without it.
// Only needs to be fixed if mocha-webpack runs into problems in the future with
// the standard config file. Don't forget to add the config parameter in package.json


var nodeExternals = require("webpack-node-externals");
 
module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
            presets: ["react", "es2015", "stage-0"],
            plugins: ["transform-decorators-legacy"]
            }
      }
    ]
  }
};
