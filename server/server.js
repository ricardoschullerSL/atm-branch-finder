var sslrootcas = require("ssl-root-cas").inject();
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var BANKDATA = require("./bankData.js").banks;



module.exports = function(port, middleware, callback) {
    var app = express();

    if(middleware) {
        app.use(middleware);
    }
    app.use(express.static("public"));
    app.use(bodyParser.json());
    
    app.get("/bankdata", (req, res) => {
        request({uri:req.query.uri, "rejectUnauthorized":false}).pipe(res)
    });
    
    var server = app.listen(port, callback);
}