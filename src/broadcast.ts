import WebSocket = require('ws');
import { Block } from './block';

/**
 * Class to broadcast messages
 */
export class Broadcast {
    
    sendPeer(peers: WebSocket[], port: Number) {
        let index: number = 0;
        console.log(`Send ADDPEER to ${peers.length} node(s)`);
        peers.forEach(function (peer) {
            index++;
            if (peer.readyState === peer.OPEN) {
                peer.send(JSON.stringify({type: 'ADDPEER', port: port}));
            } else {
                peers.splice(index, 1);
            }
        });
    }

    sendTransaction(peers: WebSocket[], block: Block) {
        let index: number = 0;
        peers.forEach(function (peer) {
            index++;
            if (peer.readyState === peer.OPEN) {
                peer.send(JSON.stringify({type: 'ADDTRANSACTION', block: block}));
            } else {
                peers.splice(index, 1);
            }
        });
    }
}