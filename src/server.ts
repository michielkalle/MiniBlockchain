import * as http from 'http';
import * as WebSocket from 'ws';
import app = require('express');
import { Blockchain } from './blockchain';
import { Block } from './block';
import { Transaction } from './transaction';
import { Peers } from  './peers';
import { Broadcast } from  './broadcast';

//initialize a simple http server
const server = http.createServer(app);

//start our server on a port between 8000 - 9000
const randomPortNumber = Math.floor(8000 + Math.random() * 1000);

//initialize the WebSocket server instance and broadcaster
const wss = new WebSocket.Server({ server });
const peers = new Peers();
const broadcast = new Broadcast();

//intialize mini blockchain
let miniBlockchain = new Blockchain();

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event for transactions
    //on this moment we have only one transaction in a block
    ws.on('message', (message: string) => {

        let messageObject = JSON.parse(message);
        let type: string = messageObject.type;

        if (type === 'ADDPEER') {
            peers.addPeer(messageObject.port);
        } else if (type.endsWith('TRANSACTION')) {
            //send transaction over the network, TODO create variable difficulty
            var block = new Block(new Date(), [new Transaction(message)], "00000");

            //example to create new transaction over socket: {"type": "CREATETRANSACTION", "data": "123"}
            //only for this type transaction will be send over the network, or we get recursions
            console.log('true?', type === 'CREATETRANSACTION');
            if (type === 'CREATETRANSACTION') {
                //broadcast to the network
                broadcast.sendTransaction(peers.getPeers(), block);
            }

            //start mining
            miniBlockchain.addBlock(block);
            console.log("Is blockchain valid? " + miniBlockchain.checkValid());

            //send feedback
            ws.send('Block #' + miniBlockchain.latestBlock().index + ' is mined!');
        } else {
            console.log(`Failed to process message type ${messageObject.type}`);
        }
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, Give me a transaction!');
});

//add server listener once on start
server.once('listening', function() {
    
    //broadcast peers to all other peers
    peers.findPeers(randomPortNumber);
    
    //dirty fix to get all peers
    setTimeout(function() {
        broadcast.sendPeer(peers.getPeers(), randomPortNumber)
    }, 4000);
});

server.listen(randomPortNumber, () => { 
    console.log(`Server started on port ${randomPortNumber}`);
});