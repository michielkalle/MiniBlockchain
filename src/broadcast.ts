import WebSocket = require('ws');
import { Block } from './block';

/**
 * Class to broadcast messages
 */
export class Broadcast {
    
    sendPeer(peers: WebSocket[], port: Number) {
        console.log(`Send ADDPEER to ${peers.length} node(s)`);
        peers.forEach(function (peer) {
            peer.send(JSON.stringify({type: 'ADDPEER', port: port}));
        });
    }

    sendTransaction(peers: WebSocket[], block: Block) {
        peers.forEach(function (peer) {
            peer.send(JSON.stringify({type: 'ADDTRANSACTION', block: block}));
        });
    }
}