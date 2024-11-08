const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
var tls = {};
try{
  tls = {
    key: process.env['PRIVATE_KEY'] || fs.readFileSync(__dirname + '/private.key', 'utf8'),
    cert: process.env['PUBLIC_CRT'] || fs.readFileSync(__dirname + '/public.crt',  'utf8'),
    maxVersion: 'TLSv1.3',
    minVersion: 'TLSv1.2'
  };
  // certificates available!
  console.log("protocol: https/wss")
} catch (err){
  console.error(err);
  // certificates unavailable
  // fallback to http/ws connections
  console.log("protocol: http/ws")
}
const protocol = ( Object.keys(tls).length != 0 ) ? https : http;
const server = protocol.createServer(tls, app).listen(port);
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
