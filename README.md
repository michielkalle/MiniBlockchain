## Mini Blockchain

## How to install
* Install npm
* Install yarn
* Install docker

## Install typescript and crypto-js and sockets
```
yarn install
```

## Development
Install all dependencies
```
yarn add typescript
yarn add crypto-js
yarn add @types/crypto-js
yarn add express
yarn add express @types/express
yarn add ws
```

## Run watcher:
```
yarn run build
```

## Run tests: created test blocks
```
yarn run test
```

## Run mini-blockchain
This will create a test connection for socket port 8999
```
yarn run start
```

## Create docker container for production
Create container, run it.
Connect on socket port: 49160, or whatever port you want
```
docker build -t michielkalle/mini-blockchain .
docker run -p 49160:8999 michielkalle/mini-blockchain
```

bash
```
docker exec -it michielkalle/mini-blockchain /bin/bash
```

## Connect on the socket
You can use this Chrome plugin:
[Simple WebSocket Client](https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo)

Send JSON data to it, and the miniblockchain will create blocks