const https = require("https");
const fs = require("fs");
const express = require("express");

const app = express();

// Load SSL Certificate & Key with Correct Path
const options = {
    key: fs.readFileSync(__dirname + "/server.key"),
    cert: fs.readFileSync(__dirname + "/server.cert"),
};

// Serve Static Files
app.use(express.static("public"));

// Start HTTPS Server
https.createServer(options, app).listen(443, () => {
    console.log("🚀 Secure server running at https://localhost");
});
