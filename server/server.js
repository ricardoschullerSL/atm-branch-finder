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
var aispId = "ATM Branch Finder";
var aispPassword = "ATMBranchPassword";
var aispCreds = new Buffer(aispId + ":" + aispPassword).toString("base64"); 

//Retrieving static bank data like ATMs, Branches and PCAs. 
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

// Do this every 24 hours.
getBankData();
setInterval(()=> {
    console.log("Getting Bank Data");
    getBankData()
}, 86400000);


// Server Code
module.exports = function(port, middleware, callback) {
    var app = express();
    
    if(middleware) {
        app.use(middleware);
    }
    app.use(express.static("public"));
    app.use(bodyParser.json());
    
    app.get("/account_info", (req, res) => {
        // START OF OAUTH2 PROTOCOL
        // FIRST STEP: PREPARE ACCOUNT REQUEST AND GET ACCESS TOKEN FROM AUTH SERVER
        let today = new Date(Date.now());
        let ExpirationDateTime = new Date(new Date(today).setMonth(today.getHours() + 1));
        let TransactionFromDateTime = new Date(new Date(today).setMonth(today.getMonth() - 1));
        let TransactionToDateTime = today;
        let account_request = {
            Permissions: ['ReadAccountsBasic', 'ReadTransactionsBasic'],
            ExpirationDateTime: ExpirationDateTime,
            TransactionFromDateTime: TransactionFromDateTime,
            TransactionToDateTime: TransactionToDateTime,
        };
        
        request.post({
            uri:authServerUrl+"/ar_access_token",
            headers: {
                'x-fapi-financial-id':'RicardoBank',
                'Authorization': "Basic " + aispCreds,
            },
        }, (authE, authR, authBody) => {
            if (authR.statusCode >= 200 && authR.statusCode < 300) {
                var access_token = JSON.parse(authBody).access_token;
                console.log("Server got access token from AuthServer.", access_token);
                
                // SECOND STEP: POST ACCOUNT REQUEST ON RESOURCE SERVER
                request.post({
                    uri:resourceServerUrl + "/account-requests", 
                    body: {access_token: access_token, account_request: account_request}, 
                    json: true
                }, (resourceErr, resourceRes, resourceBody) => {
                    // REDIRECT CLIENT TO BANK AUTHENTICATION PAGE
                    let accountRequestId = resourceBody;
                    res.redirect(authServerUrl + "/authenticate/account_info/" 
                    + accountRequestId);
                })
            } else {
                res.status(400).send(authE)
            }
        })
    })
    
    app.get("/authorizationcode/:code", (req, res) => {
        // THIRD STEP: GOT AUTHORIZATION CODE, EXCHANGE IT FOR ACCESS TOKEN TO RESOURCE
        request.get({uri:authServerUrl+"/exchange/"+req.params.code}, (authE, authR, authBody) => {
            if (authR.statusCode >= 200 && authR.statusCode < 300) {
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
        });
    });
    
    app.get("/banks", (req, res) => {
        res.send(JSON.stringify(banks));
    })
    
    app.get("/banks/:bankId", (req, res) => {
        let bankIndex = banks.findIndex((bank) => bank.id === req.params.bankId);
        if (bankIndex > -1) {
            res.send(banks[bankIndex]);
        } else {
            res.status(400).send("Bank not found on server.");
        }
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