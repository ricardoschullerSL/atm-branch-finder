var server = require("./server/server");
var AuthServer = require("./server/AuthServer");
var ResourceServer = require("./server/ResourceServer");

var port = process.env.PORT || 8080;
server(port);
console.log("Server running on port " + port);

if (process.env.NODE_ENV !== "production") {
    AuthServer(9090);
    console.log("Authentication Server running on port 9090");
    ResourceServer(9091);
    console.log("Resource Server running on port 9091");
}


