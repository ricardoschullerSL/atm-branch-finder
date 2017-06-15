var express = require("express");
var bodyParser = require("body-parser");


module.exports = function(port, middleware, callback) {
    var app = express();
    
    if(middleware) {
        app.use(middleware);
    }
    app.use(express.static("public"));
    app.use(bodyParser.json());
    
    var server = app.listen(port, callback);
}