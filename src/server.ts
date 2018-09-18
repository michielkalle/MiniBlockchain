
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import app = require('express');

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        
        // TODO create block
        ws.send('We need to do something :)');
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, Give me a transaction!');
});

//start our server
server.listen(process.env.PORT || 8999, () => { 
    console.log(`Server started on port 8999`);
});