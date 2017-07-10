'use strict';
var rootCas = require("ssl-root-cas/latest").create();
var fs = require("fs");
var https = require("https");
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var banks = require("./bankData").banks;

https.globalAgent.options.ca = rootCas;

var options = {
    key: fs.readFileSync("./server/ssl/mockserver.key"),
    cert: fs.readFileSync("./server/ssl/mockserver.crt")
}

var authServerUrl = "http://localhost:9090";
var resourceServerUrl = "http://localhost:9091";

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
    
    app.get("/account_info", (req, res) => {
        // START OF OAUTH2 PROTOCOL
        // FIRST STEP: GET ACCESS TOKEN FROM AUTH SERVER
        request.post({uri:authServerUrl+"/ar_access_token"}, (authE, authR, authBody) => {
            if (!authE) {
                var access_token = JSON.parse(authBody);
                console.log("Server got access token from AuthServer.", access_token);
                
                // SECOND STEP: POST ACCOUNT REQUEST ON RESOURCE SERVER
                request.post({
                    uri:resourceServerUrl + "/account-requests", 
                    body: access_token, 
                    json: true
                }, (resourceErr, resourceRes, resourceBody) => {
                    // FINALLY REDIRECT CLIENT TO BANK AUTHENTICATION PAGE
                    res.redirect(authServerUrl + "/authenticate/account_info/" 
                    + resourceBody.accountRequestId);
                })
            } else {
                console.log(authE);
            }
        })
    })
    
    app.get("/authorizationcode/:code", (req, res) => {
        // THIRD STEP: GOT AUTHORIZATION CODE, EXCHANGE IT FOR ACCESS TOKEN TO RESOURCE
        request.get({uri:authServerUrl+"/exchange/"+req.params.code}, (authE, authR, authBody) => {
            if (authR.statusCode >= 200 & authR.statusCode < 300) {
                console.log("Exchanged auth code for access token: ", authBody);
                let access_token = JSON.parse(authBody);
                // FINAL STEP: USE ACCESS TOKEN TO GET ACCOUNT INFO FROM RESOURCE SERVER
                request.get({
                    uri:resourceServerUrl+"/accounts/1/accountInfo", 
                    body: access_token, 
                    json:true
                },(resourceE, resourceR, resourceBody) => {
                    if (!resourceE) {
                        res.status(200).send(resourceBody);
                    } else {
                        console.log("Error during resource fetching: ", resourceE);
                    }
                })
            } else {
                res.status(500).send(authE);
            }
            
        })
    })
    
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
    
    
    var server = https.createServer(options, app);
    server.listen(port, callback);
}