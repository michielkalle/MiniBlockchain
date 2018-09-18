
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import app = require('express');
import { Blockchain } from './blockchain';
import { Block } from './block';
import { Transaction } from './transaction';

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

//intialize mini blockchain
let miniBlockchain = new Blockchain();

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event for transactions
    //on this moment we have only one transaction in a block
    ws.on('message', (message: any) => {

        console.log('received transaction...');
        console.log('generate block...');

        // TODO create variable difficulty
        miniBlockchain.addBlock(new Block(new Date(), new Transaction(message), "000"));

        console.log("Is blockchain valid? " + miniBlockchain.checkValid());

        ws.send('Block #' + miniBlockchain.latestBlock().index + ' is mined!');
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, Give me a transaction!');
});

//start our server
server.listen(process.env.PORT || 8999, () => { 
    console.log(`Server started on port 8999`);
});