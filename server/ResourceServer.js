var express = require("express");
var bodyParser = require("body-parser");
var crypto = require("crypto");
var accounts = require("./accounts").accounts;
var authServerCreds = "Basic QXV0aFNlcnZlcjpBdXRoUGFzc3dvcmQ="
var account_requests_counter = 0;
var account_requests = []
var access_tokens = [];
var ar_access_tokens = [];



function newAccountRequest(request) {
    let ar = {
        id: crypto.randomBytes(20).toString('hex'),
        status: 2, //Code for AwaitingAuthorization
        Permissions: request.permissions,
        ExpirationDateTime: request.ExpirationDateTime,
        TransactionFromDateTime: request.TransactionFromDateTime,
        TransactionToDateTime: request.TransactionToDateTime
    };
    account_requests.push(ar);
    return ar.id;
}

module.exports = function(port, middleware, callback) {
    var app = express();
    
    if (middleware) {
        app.use(middleware);
    }
    
    app.use(bodyParser.json());
    
    app.use("/accounts/:accountId",(req, res, next) => {
        // Main account access middleware. TPP should always provide valid access token
        // Should also check for TPP credentials/certificate here.
        if (accounts.findIndex((account) => account.id === parseInt(req.params.accountId, 10)) === -1) {
            console.log("Request made to nonexistant account Id: ", req.params.accountId);
            res.status(400).send();
        } else {
            console.log("Account "+req.params.accountId+" accessed at ", Date());
            let token_index = access_tokens.findIndex((token) => token.access_token === req.body.access_token)
            if (token_index > -1) {
                access_tokens.pop(token_index);
                next();
            } else {
                res.status(403).send("Access token not found.")
            };
        }
    });
    
    app.use("/authserver/", (req, res, next) => {
        if (req.get("Authorization") === authServerCreds) {
            console.log("Auth Server provided correct credentials to Resource Server.")
            next();
        }
        else {
            res.status(403).send("Auth server creds are wrong.")
        }
    })
    
    app.post("/account-requests", (req, res) => {;
        let token_index = ar_access_tokens.findIndex((token) => token.access_token === req.body.access_token)
        if (token_index > -1) {
            console.log("Resource server recieved new account request.")
            ar_access_tokens.pop(token_index);
            var accountRequestId = newAccountRequest(req.body.account_request);
            res.status(201).send(accountRequestId);
        } else {
            console.log("Access token not found");
            res.status(403).send();
        } 
    });
    
    app.post("/authserver/ar_access_token", (req, res) => {
        ar_access_tokens.push(req.body)
        res.status(201).send();
    });
    
    app.delete("/authserver/accountRequestId/:accountRequestId", (req, res) => {
        let account_request_index = account_requests.findIndex((ar) => ar.id === req.params.accountRequestId);
        if ( account_request_index > -1) {
            account_requests.pop(account_request_index);
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    })
    
    app.post("/authserver/access_token", (req, res) => {
        access_tokens.push(req.body)
        res.status(201).send();
    });
    
    app.get("/accounts/:accountId/accountInfo", (req, res) => {
        let account = accounts.find((account) => account.id.toString() === req.params.accountId);
        if (account) {
            let responseBody = {
                "Data":{
                    accountInfo:account 
                },
                "Risk":{
                    
                },
                "Links":[
                    
                ],
                "Meta":{
                    
                }
            }
            res.status(200).send(JSON.stringify(responseBody));
        } else {
            console.log("Account not found?");
            res.status(500).send();
        }
    });
    
    var server = app.listen(9091, callback)
}
