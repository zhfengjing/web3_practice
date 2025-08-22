const { randomBytes } = require('crypto');
const Transaction = require('./transaction');

class Wallet {
    constructor(accountName) {
        this.accountName = accountName;
        this.address = this.generateKey();
        this.priviteKey = this.generateKey();
    }

    generateKey = () => {
        return randomBytes(32).toString('hex');
    }

    createTransaction = (toAddress, amount, blockChain) => {
        const balance = blockChain.getBalanceOfAddress(this.address);
        if (amount > balance) {
            throw new Error('余额不足，交易失败');
            return;
        }
        //生成一个交易
        const trans = new Transaction(this.address, toAddress, amount);
        trans.signTransaction(this.priviteKey);
        return trans;
    }
}

module.exports = Wallet;