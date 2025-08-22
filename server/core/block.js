const cryptoJs = require('crypto-js');

class Block {
    constructor(timestamp, transactions, previousHash) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return cryptoJs.SHA256(
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.transactions) +
            this.nonce
        ).toString();
    }

    // 工作量证明
    mineBlock = (difficulty) => {
        const target = Array(difficulty + 1).join('0');
        console.log('target', target);
        console.log('difficulty', difficulty);
        console.log('this.hash', this.hash);
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`区块已挖出: ${this.hash}`);
    }
}

module.exports = Block;