'use strict';
var rootCas = require("ssl-root-cas/latest").create();
var fs = require("fs");
var https = require("https");
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var banks = require("./bankData").banks;
var atms = [];

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
                if (uri === "atms") {
                    data.map((item) => {
                        atms.push(item);
                    })
                }
            })
            .on("error", (e) => {
                console.log("Error during bank data retrieval:", e);
            });
            
        }
    });
};


var setupServer = new Promise((resolve, reject) => {
    
})
// Do this every 24 hours.
getBankData();
setInterval(()=> {
    console.log("Getting Bank Data");
    getBankData();

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
        // Start of the OAuth2 protocol.
        // First step: prepare account request and get access token from authentication server.
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
                // Second step: POST account request on resource server.
                request.post({
                    uri:resourceServerUrl + "/account-requests", 
                    body: {access_token: access_token, account_request: account_request}, 
                    json: true
                }, (resourceErr, resourceRes, resourceBody) => {
                    // Redirect client to bank authentication page.
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
        // Third step: Got authorization code, exchange it for access token to resource.
        request.get({uri:authServerUrl+"/exchange/"+req.params.code}, (authE, authR, authBody) => {
            if (authR.statusCode >= 200 && authR.statusCode < 300) {
                console.log("Exchanged auth code for access token: ", authBody);
                let access_token = JSON.parse(authBody);
                // Final step: use access token to get resource from resource server.
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
        // TODO: Large object. Needs to be trimmed down.
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
    
    app.get("/banks/:bankId/atms", (req, res) => {
        let bankIndex = banks.findIndex((bank) => bank.id === req.params.bankId);
        (bankIndex > -1) ? res.send(banks[bankIndex].atms) : res.status(400).send("Bank not found on server.");
    });
    
    app.get("/atms", (req, res) => {
        res.send(atms);
    });
    
    app.get("/atms/userlocation/:userLatitude/:userLongitude/:maxDistance", (req, res) => {
        let closeAtms = atms.filter((atm) => {
            atm.distanceSquared = Math.pow(atm.GeographicLocation.Latitude - req.params.userLatitude, 2) 
            + Math.pow(atm.GeographicLocation.Longitude - req.params.userLongitude, 2);
            return atm.distanceSquared <= Math.pow(req.params.maxDistance, 2);
        })
        closeAtms.length > 0 ? res.send(closeAtms) : res.status(204).send("No ATMs found within max Distance");
    });
    
    app.get("/atms/city/:cityName", (req, res) => {
        let filteredAtms = atms.filter((atm) => {
            return (atm.Address.TownName) ? 
                    atm.Address.TownName.toUpperCase() === req.params.cityName.toUpperCase() : false;
        })
        filteredAtms.length > 0 ? res.send(filteredAtms) : res.status(204).send("No ATMs found in " + req.params.cityName);
    });
    
    app.get("/banks/:bankId/branches/city/:cityName", (req, res) => {
        let bankIndex = banks.findIndex((bank) => bank.id === req.params.bankId);
        if (bankIndex > -1) {
            let branches = banks[bankIndex].branches.filter((branch) => {
                return (branch.Address.TownName) ?
                branch.Address.TownName.toUpperCase() === req.params.cityName.toUpperCase() : false;
            });
            branches.length > 0 ? res.send(branches) : res.status(204).send("No branches found in " + req.params.cityName);
        } else {
            res.status(400).send();
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
    
    
    if (process.env.NODE_ENV !== "production") {
        https.globalAgent.options.ca = rootCas;
        
        var options = {
            key: fs.readFileSync("./server/ssl/mockserver.key"),
            cert: fs.readFileSync("./server/ssl/mockserver.crt")
        }
        var server = https.createServer(options, app);
        server.listen(port, callback);
    } else {
        http.globalAgent.options.ca = rootCas;
        var server = app.listen(port, callback);
    }
}