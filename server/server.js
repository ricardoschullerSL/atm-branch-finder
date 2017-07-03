'use strict';
var rootCas = require('ssl-root-cas/latest').create();
var fs = require("fs");
var https = require('https');
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var banks = require("./bankData").banks;

https.globalAgent.options.ca = rootCas;

//setting up bank data 

var getBankData = function() {
    banks.map((bank) => {
        for (let uri in bank.uris) {
            request({uri: bank.uris[uri]}, (err, res, body) => {
                if (body) {
                    var data = JSON.parse(body).data;
                }
                bank[uri] = data
            })
            .on("error", (e) => {
                console.log("Error during bank data retrieval:", e);
            });
            
        }
    })
};

getBankData();
setInterval(()=> {
    console.log("Getting Bank Data");
    getBankData()
}, 86400000);



module.exports = function(port, middleware, callback) {
    var app = express();
    
    if(middleware) {
        app.use(middleware);
    }
    app.use(express.static("public"));
    app.use(bodyParser.json());
    
    app.get("/banks", (req, res) => {
        res.send(JSON.stringify(banks));
    })
    
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