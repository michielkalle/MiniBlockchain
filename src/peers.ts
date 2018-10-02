import WebSocket = require('ws');

/**
 * Clas to find and get peers
 */
export class Peers {
    peers: WebSocket[];

    constructor() {
        this.peers = [];
    }

    findPeers(currentPort: Number) {
        let range = [8000, 9000]
        for (let i = range[0]; i <= range[1]; i++) {
            if (i === currentPort) {
                continue;
            }
    
            this.addPeer(i);
        }
    }

    addPeer(port: Number) {
        let connectionPort = 'ws://localhost:' + port;
        let socket = new WebSocket(connectionPort);
        
        socket.addEventListener("open", o => {
            if (o.target.readyState === socket.OPEN) {
                console.log("Found peer on port: " + port);
                this.peers.push(socket);
            }
        });

        socket.addEventListener("error", e => {
            //no connection, just go on
        });
    }

    getPeers() {
        return this.peers;
    }
}