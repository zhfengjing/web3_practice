const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain {
    constructor() {
        this.chain = [this.createIniticalBlock()];
        this.difficulty = 2;
        this.miningReword = 10;
        this.pendingTransactions = [];
    }
    createIniticalBlock = () => {
        return new Block(Date.now(), [], '0');
    }

    getLatestBlockHash = () => {
        const block = this.chain[this.chain.length - 1];
        console.log('latestblock', block);
        return block.hash;
    }

    addNewTransaction = (transaction) => {
        // 验证发送方和接收方地址是否有效
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('必须包含发送方地址和接收方地址');
        }
        if (!transaction.isValid) {
            throw new Error('无法添加无效交易到区块链');
        }
        this.pendingTransactions.push(transaction);
    }

    minePendingTransaction = (miningRewardAddress) => {
        const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlockHash());
        // mine
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        // 重设待处理交易，并添加挖矿奖励交易
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReword)
        ];
        console.log('this.pendingTransactions=', this.pendingTransactions);
    }

    getBalanceOfAddress = address => {
        let balance = 0;
        for (const block of this.chain) {
            console.log('getabalance-block', block);
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        console.log('balance=', balance);
        return balance;
    }

    //验证区块链完整性
    isChainValid = () => {
        for (let i = 0; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain(i - 1);
            // 验证区块hash
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            // 验证区块链接性
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            // 验证区块中的所有交易
            for (const tx of currentBlock.transactions) {
                if (!tx.isValid()) {
                    return false;
                }
            }
        }

        return true;
    }
}

module.exports = Blockchain;