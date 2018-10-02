import { Block } from './block';
import { Blockchain } from './blockchain';
import { Transaction } from './transaction';

let miniBlockchain = new Blockchain();
miniBlockchain.addBlock(new Block(new Date(), [new Transaction({amount: 5})], "000"));
miniBlockchain.addBlock(new Block(new Date(), [new Transaction({amount: 10})], "000"));
miniBlockchain.addBlock(new Block(new Date(), [new Transaction({amount: 3})], "000"));

//console.log(JSON.stringify(miniBlockchain, null, 4));
console.log("Is blockchain valid? " + miniBlockchain.checkValid());