import axios from 'axios';
const req_prefix = '/api';

function request(url, data, method = 'post') {
    return axios[method](req_prefix + url, data).then(res => res.data).catch(err => {
        console.log('axios-err', err);
        throw new Error(err);
    })
}
const createAccount = data => request('/createAccount', data);
const transferAccounts = data => request('/transferAccounts', data);
const mine = miningAddress => request('/mine', { miningAddress });
const pendingTransactions = data => request('/pendingTransactions', data, 'get');
const getBalanceOfAddress = address => request(`/wallets/${address}/balance`, {}, 'get');
const validChain = () => request('/validate', {}, 'get');
const getBlocks = () => request('/blocks', {}, 'get');
const getPendingTransactions = () => request('/pendingTransactions', {}, 'get');

export { createAccount, transferAccounts, mine, pendingTransactions, getBalanceOfAddress, validChain, getBlocks, getPendingTransactions }