'use strict';
var rootCas = require('ssl-root-cas/latest').create();
var fs = require("fs");
var https = require('https');
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var banks = require("./bankData");

https.globalAgent.options.ca = rootCas;

//setting up bank data 

module.exports = function(port, middleware, callback) {
    var app = express();

    if(middleware) {
        app.use(middleware);
    }
    app.use(express.static("public"));
    app.use(bodyParser.json());
    
    app.get("/bankdata", (req, res) => {
        request({uri:req.query.uri})
        .on("error", (e) => {
            console.log("Error occured during request:", e);
            res.send(e);
        })
        .pipe(res);
    });
    
    var server = app.listen(port, callback);
}