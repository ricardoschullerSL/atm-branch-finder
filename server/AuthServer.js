var express = require("express");
var request = require("request");
var crypto = require("crypto");
var cookieParser = require("cookie-parser");
var path = require("path");

var resourceServerUrl = "http://localhost:9091";
var aispUrl = "https://mockserver.com:8080"
var authCodes = [];


function newAccessToken() {
    return crypto.randomBytes(20).toString('hex');
}

function newAuthorizationCode(accountRequestId) {
    let authObject = {
        accountRequestId:accountRequestId,
        authCode: crypto.randomBytes(20).toString('hex')
    }
    authCodes.push(authObject);
    return authObject;
}

var username = "AuthServer";
var password = "AuthPassword";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

module.exports = function(port, middleware, callback) {
    var app = express();
    if (middleware) {
        app.use(middleware);
    }
    app.use(cookieParser());
    
    app.post("/ar_access_token", (req, res) => {
        console.log("Account request access token requested.")
        var access_token = newAccessToken();
        var reqbody = {
            access_token:access_token
        };
        request.post({   
            url: resourceServerUrl+"/authserver/ar_access_token",
            headers: {
                'Authorization': auth,
                'User-Agent': 'request',
                'Content-Type':'application/json'
            },
            body: reqbody,
            json: true
            
        }, (err, response, body) => {
            if (response.statusCode === 201) {
                console.log("Auth server got response from Resource server that access token is created")
                res.status(201).send({access_token: access_token});
            } else {
                console.log("Resource server couldn't create access_token.")
                res.status(500).send();
            }
        });                
    });
    
    app.get("/authenticate/account_info/:accountRequestId", (req, res) => {
        res.sendFile(path.join(__dirname, "authenticate.html"));
    });
    
    app.get("/authenticate/account_info/:accountRequestId/:isAccepted", (req, res) => {
        console.log(req.params);
        if (req.params.isAccepted) {
            console.log("Redirecting PSU to AISP again.")
            var authObject = newAuthorizationCode(req.params.accountRequestId)
            res.redirect(aispUrl + "/authorizationcode/" + authObject.authCode);
        } else {
            console.log("PSU didn't accept. Stopping OAuth")
            res.status(500).send();
        }
    })
    
    app.get("/exchange/:code", (req, res) => {
        let codeIndex = authCodes.findIndex((item) => item.authCode === req.params.code)
        if (codeIndex > -1) {
            console.log("Account request access token requested.")
            var access_token = newAccessToken();
            authCodes.pop(codeIndex);
            var reqbody = {
                access_token:access_token
            };
            request.post({   
                url: resourceServerUrl+"/authserver/access_token",
                headers: {
                    'Authorization': auth,
                    'User-Agent': 'request',
                    'content-type':'application/json'
                },
                body: reqbody,
                json: true
                
            }, (err, response, body) => {
                if (response.statusCode === 201) {
                    console.log("Auth server got response from Resource server that access token is created")
                    res.status(201).send({access_token: access_token});
                } else {
                    console.log("Resource server couldn't create access_token.")
                    res.status(500).send();
                }
            });
        } else {
            res.status(500).send("Authorization code not found");
        }
    })
    
    
    
    
    var server = app.listen(9090, callback);
}