const express = require('express');
const app = express();
const path = require('path');
const expressWs = require('express-ws')(app);
const port = process.env.PORT || 8080;

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

app.listen(port);
