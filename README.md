## Mini Blockchain

## How to install
* Install npm
* Install yarn
* Install docker

Create node_modules
```
npm init
```

## Install typescript and crypto-js and sockets
Install all dependencies
```
yarn add typescript
yarn add crypto-js
yarn add @types/crypto-js
yarn add express
yarn add express @types/express
yarn add ws
```
or
```
yarn install
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
```
yarn run start
```

## Run docker
Create container, run it.
Connect on port: 49160
```
docker build -t michielkalle/mini-blockchain .
docker run -p 49160:8999 michielkalle/mini-blockchain
```

bash
```
docker exec -it michielkalle/mini-blockchain /bin/bash
```