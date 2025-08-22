const cryptoJs = require('crypto-js');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
        this.signature = '';
    }

    // calculate hash
    calculateHash = () => {
        return cryptoJs.SHA256(
            this.fromAddress +
            this.toAddress +
            this.amount +
            this.timestamp
        ).toString();
    }

    signTransaction = signKey => {
        const hash = this.calculateHash();
        this.signature = signKey + hash;
    }

    // 验证交易签名
    isValid() {
        // 如果是挖矿奖励交易，跳过验证
        if (this.fromAddress === null) return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error('没有签名，交易无效');
        }

        // 在实际应用中，这里应该验证签名
        // 简化版本
        return true;
    }
}

module.exports = Transaction;