import axios from 'axios';
const req_prefix = '/api';

function request(url, data = {}, method = 'post') {
    return axios[method](req_prefix + url, data).then(res => res.data).catch(err => {
        console.log('axios-err', err);
        throw new Error(err);
    })
}

export { request }