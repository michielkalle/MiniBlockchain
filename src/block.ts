import { SHA256 } from 'crypto-js';
import { Transaction } from './transaction';

/**
 * The block where transactions are saved
 * and the proof of work is done
 */
export class Block {
    index: number;
    timestamp: Date;
    transactions: Transaction[];
    previousHash: string;
    hash: string;
    nonce: number;
    attempts: number;
    difficulty: string;

    constructor(timestamp: Date, transactions: Transaction[], difficulty: string) {
        this.index = 0;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = "";
        this.nonce = 0;
        this.attempts = 0;
        this.difficulty = difficulty;
        this.hash = this.calculateHash();
    }

    mineBlock() {
        while(this.hash.substring(0, this.difficulty.length) !== this.difficulty) {
            this.nonce = this.generateRandomNumber();
            this.attempts = this.attempts + 1;
            this.hash = this.calculateHash();
        }
        return this;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.transactions + this.nonce).toString();
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 99999999);
    }
}