import WebSocket = require('ws')

let peers: WebSocket[];

export const findPeers = function(currentPort: Number) {
    peers = [];

    let range = [8000, 9000]
    for (let i = range[0]; i <= range[1]; i++) {
        if (i === currentPort) {
            continue;
        }

        let connectionPort = 'ws://localhost:' + i;
        let socket = new WebSocket(connectionPort);
        
        socket.addEventListener("open", o => {
            if (o.target.readyState === socket.OPEN) {
                console.log("Found peer on port: " + i);
                peers.push(socket);
            }
        });

        socket.addEventListener("error", e => {
            //no connection, just go on
        });
    }
}