import {Block} from './block'
import {Blockchain} from './blockchain'

let args = process.argv.slice(2);
const difficulty: string = args[0] as string;
console.log("Difficulty: " + difficulty);

let miniBlockchain = new Blockchain();
miniBlockchain.addBlock(new Block(new Date(), {amount: 5}, difficulty));
miniBlockchain.addBlock(new Block(new Date(), {amount: 10}, difficulty));
miniBlockchain.addBlock(new Block(new Date(), {amount: 3}, difficulty));

//console.log(JSON.stringify(miniBlockchain, null, 4));
console.log("Is blockchain valid? " + miniBlockchain.checkValid());