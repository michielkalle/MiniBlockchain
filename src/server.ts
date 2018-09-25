
import * as http from 'http';
import * as WebSocket from 'ws';
import app = require('express');
import { Blockchain } from './blockchain';
import { Block } from './block';
import { Transaction } from './transaction';
import { findPeers } from  './peers';

//initialize a simple http server
const server = http.createServer(app);

//start our server on a port between 8000 - 9000
const randomPortNumber = Math.floor(8000 + Math.random() * 1000);

//initialize the WebSocket server instance and broadcaster
const wss = new WebSocket.Server({ server });

//intialize mini blockchain
let miniBlockchain = new Blockchain();

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event for transactions
    //on this moment we have only one transaction in a block
    ws.on('message', (message: JSON) => {

        console.log('received transaction...');

        console.log('generate block...');

        //TODO create variable difficulty
        miniBlockchain.addBlock(new Block(new Date(), [new Transaction(message)], "0000"));

        console.log("Is blockchain valid? " + miniBlockchain.checkValid());

        //send feedback
        ws.send('Block #' + miniBlockchain.latestBlock().index + ' is mined!');
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, Give me a transaction!');
});

server.listen(randomPortNumber, () => { 
    console.log(`Server started on port ${randomPortNumber}`);

    //find peers
    findPeers(randomPortNumber);

    //TODO broadcast peers to all other peers
});