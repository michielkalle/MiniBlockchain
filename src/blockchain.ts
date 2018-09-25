import { Block } from './block'
import { Transaction } from './transaction';

/**
 * The blockchain holding the blocks
 * Here we can check for a valid blockchain
 */
export class Blockchain {
    chain: Block[];

    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return new Block(new Date(), [new Transaction({name: 'Genesis block', amount: 0})], "0")
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock: Block){
        console.log('Generating new block...');

        newBlock.index = this.chain.length;
        newBlock.previousHash = this.latestBlock().hash;
        newBlock = newBlock.mineBlock();

        this.log(newBlock);
        this.chain.push(newBlock);
    }

    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

    log(block: Block) {
        console.log('---------------------------------------');
        console.log('| Succesfull generated: #' + block.index);
        console.log('| Difficulty: ' + block.difficulty);
        console.log('| Hash: ' + block.hash);
        console.log('| Attempts: ' + block.attempts);
        console.log('| Nonce: ' + block.nonce);
        console.log('---------------------------------------');
    }
}