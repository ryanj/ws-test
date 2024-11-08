const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
var options = {};
try{
  options = {
     key: process.env['PRIVATE_KEY'] || fs.readFileSync(__dirname + '/private.key', 'utf8'),
    cert: process.env['PUBLIC_CRT'] || fs.readFileSync(__dirname + '/public.crt', 'utf8')
  };
  console.log("protocol: https/wss")
} catch (err){
  console.error(err);
  console.log("protocol: http/ws")
}
var protocol = ( Object.keys(options).length == 0 ) ? http : https;
var server = protocol.createServer(options, app).listen(port);
const expressWs = require('express-ws')(app, server);

// Serve web page HTML
app.get('/ws', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
 
// WebSocket function
app.ws('/ws/echo', (ws, req) => {
    // receive a message from a client
    ws.on('message', msg => {
        console.log(msg);
        
        // broadcast message to all clients
        var wss = expressWs.getWss();
        wss.clients.forEach(client => client.send("Received: " + msg));
    })
});
