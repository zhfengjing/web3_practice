const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Wallet = require('./core/wallet');
const BlockChain = require('./core/blockchain');
const Transaction = require('./core/transaction');

const app = express();

app.use(bodyParser.json());

app.use(cors());

// 初始化区块链
const chain = new BlockChain();
// 存储创建的钱包账户
const wallets = {};
console.log('chain', chain);
app.post('/createAccount', (req, res) => {
    const { accountName } = req.body;
    console.log('node-createACcounts', res.body);
    const wallet = new Wallet(accountName);
    wallets[wallet.address] = wallet;
    return res.json({
        accountName,
        publicKey: wallet.address,
        priviteKey: wallet.priviteKey,
        balance: chain.getBalanceOfAddress(wallet.address)
    })
})

// 获取钱包账户
app.get('/wallets', (req, res) => {
    res.json({
        wallets,
    });
});

// 获取钱包余额
app.get('/wallets/:address/balance', (req, res) => {
    const address = req.params.address;
    console.log('address=', address);
    const balance = chain.getBalanceOfAddress(address);
    console.log('balance-res=', balance);
    res.json({
        address,
        balance
    });
});

app.post('/transferAccounts', (req, res) => {
    const { fromAddress, toAddress, amount } = req.body;
    if (!fromAddress || !toAddress || !amount) {
        return res.status(400).json({ error: '请提供所有必要的交易信息' });
    }
    const wallet = wallets[fromAddress];
    console.log('wallets=', wallets);
    console.log('wallet=', wallet);
    if (!wallet) {
        return res.status(401).json({ error: '钱包认证失败' });
    }
    const tx = wallet.createTransaction(toAddress, amount, chain);
    chain.addNewTransaction(tx);
    return res.json({
        message: '交易添加成功，等待挖矿确认',
        transaction: tx
    });

})
app.post('/mine', (req, res) => {
    const { miningAddress } = req.body;
    if (!miningAddress) {
        return res.status(400).json({ error: '请提供挖矿奖励地址' });
    }
    console.log('mine,chain', chain);
    // 如果没有待处理交易，添加一个测试交易
    if (chain.pendingTransactions.length === 0) {
        chain.pendingTransactions.push(new Transaction(null, miningAddress, 10));
    }
    console.log('开始挖矿...');
    chain.minePendingTransaction(miningAddress);
    res.json({
        message: '挖矿成功！',
        block: chain.chain[chain.chain.length - 1],
        balance: chain.getBalanceOfAddress(miningAddress)
    });

})

// 获取待处理交易
app.get('/pendingTransactions', (req, res) => {
    res.json({ pendingTransactions: chain.pendingTransactions });
});
// 获取区块
app.get('/blocks', (req, res) => {
    res.json({ chain });
});



// 验证区块链
app.get('/validate', (req, res) => {
    const isValid = chain.isChainValid();

    if (isValid) {
        res.json({ valid: true, message: '区块链验证通过' });
    } else {
        res.json({ valid: false, message: '区块链无效！' });
    }
});



app.listen('8000', port => {
    console.log('server is running on port 8000');
})