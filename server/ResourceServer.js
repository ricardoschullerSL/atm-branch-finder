var express = require("express");

var authServerCreds = "Basic QXV0aFNlcnZlcjpBdXRoUGFzc3dvcmQ="
var account_requests_counter = 0;
var account_requests = []
var access_tokens = [];
var ar_access_tokens = [];
var superSecretResource = {value:"You've found the treasure!"}
var accounts = [
    {
        id: 1,
        transactions:[
            {
                tranactionId: 1024,
                value: "£10",
                recipient:"Donald Trump"
            },
            {
                transactionId: 2048,
                value: "£300",
                recipient:"Donald Duck"
            }
        ]
    },
    {
        id: 2,
        tranactions:[]
    }
]


function newAccountRequest() {
    newId = account_requests_counter;
    account_requests.push(newId);
    account_requests_counter += 1;
    return newId;
}

module.exports = function(port, middleware, callback) {
    var app = express();
    
    if (middleware) {
        app.use(middleware);
    }
    
    app.use("/accounts/:accountId",(req, res, next) => {
        // Main account access middleware
        console.log("Account "+req.params.accountId+" accessed at ", Date());
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            let access_token = JSON.parse(body);
            let token_index = access_tokens.findIndex((token) => token.access_token === access_token.access_token)
            if (token_index > -1) {
                access_tokens.pop(token_index);
                next();
            } else {
                res.status(403).send("Access token not found.")
            };
        });
    });
    
    // app.use("/account-requests/", (req, res, next) => {
    //     if (access_tokens.findIndex((access_token) => {access_token.id === req.params.access_token}) > -1) {
    //         next()
    //     }
    //     else {
    //         res.sendStatus(403)
    //     } 
    // });
    
    app.use("/authserver/", (req, res, next) => {
        if (req.get("Authorization") === authServerCreds) {
            console.log("Auth Server provided correct credentials to Resource Server.")
            next();
        }
        else {
            res.status(403).send("Auth server creds are wrong.")
        }
    })
    
    app.post("/account-requests", (req, res) => {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on("end", () => {
            let access_token = JSON.parse(body);
            let token_index = ar_access_tokens.findIndex((token) => token.access_token === access_token.access_token)
            if (token_index > -1) {
                console.log("Resource server created new accountRequestId.")
                ar_access_tokens.pop(token_index);
                var accountRequestId = newAccountRequest();
                res.status(201).send({accountRequestId:accountRequestId});
            } else {
                console.log("Access token not found");
                res.status(403).send();
            } 
        })
    })
    
    app.post("/authserver/ar_access_token", (req, res) => {
        let body = ''
        req.on("data", (chunk) => {
            body += chunk
        })
        req.on("end", () => {
            let access_token = JSON.parse(body);
            ar_access_tokens.push(access_token)
            res.status(201).send();
        });
    });
    
    app.post("/authserver/access_token", (req, res) => {
        let body = ''
        req.on("data", (chunk) => {
            body += chunk
        })
        req.on("end", () => {
            let access_token = JSON.parse(body);
            access_tokens.push(access_token)
            res.status(201).send();
        });
    });
    
    app.get("/accounts/:accountId/accountInfo", (req, res) => {
            let account = accounts.find((account) => account.id.toString() === req.params.accountId);
            if (account) {
                res.status(200).send(account);
            } else {
                console.log("Account not found?");
                res.status(500).send();
            }
    });
    
    var server = app.listen(9091, callback)
}
