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
     key: fs.readFileSync(__dirname + '/private.key', 'utf8'),
    cert: fs.readFileSync(__dirname + '/public.crt', 'utf8')
  };
  var server = https.createServer(options, app).listen(port);
} catch (err){
  console.error(err);
  //const expressWs = require('express-ws')(app);
  //app.listen(port);
  var server = http.createServer(options, app).listen(port);
}
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
