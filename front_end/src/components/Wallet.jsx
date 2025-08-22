import React, { useState } from 'react'
import { Button, Row, Col, Descriptions, Input, Modal } from 'antd';
import { createAccount, getBalanceOfAddress } from '@/service/index';
import { useRef } from 'react';

function Wallet(props) {
    const inputRef = useRef(null);
    const [accounts, setAccounts] = useState([]);

    const addNewAccount = () => {
        const accountName = inputRef.current.input.value;
        if (!accountName) {
            Modal.info({
                title: 'please input account name'
            })
            return;
        }
        createAccount({ accountName }).then(res => {
            console.log('account-res', res);
            setAccounts([...accounts, res]);

        })
    }
    const getBalance = (address) => {
        getBalanceOfAddress(address).then(res=>{
            setAccounts(accounts.map(item=>{
                if(item.publicKey===address){
                    item.balance=res.balance;
                }
                return {...item};
            }))
        })
    }
    console.log('accounts', accounts);
    return (
        <div className='wallet'>
            <Row>
                <Col span={1} style={{ lineHeight: '32px' }}>User:</Col>
                <Col span={6}><Input placeholder='please input user account name' ref={inputRef} /></Col>
                <Col span={4}><Button type='primary' onClick={addNewAccount} className='create_account_btn'>Create Account</Button></Col>
            </Row>

            {
                accounts && accounts.length > 0 && accounts.map(({ accountName, publicKey, priviteKey,balance }, index) => <div className='account'><Descriptions title={accountName} items={[{ key: index, label: 'Address', children: publicKey }, { key: index, label: 'PriviteKey', children: priviteKey || '--' }, { key: index, label: 'Balance', children: <span>{balance || 0} <Button type='primary' onClick={()=>getBalance(publicKey)} size='small' className='refresh_balance_btn'>Refresh Balance</Button></span> }]} column={1} /></div>)
            }


            {/* <Row>
                <Col span={3}>Wallet address:</Col>
                <Col span={16}>{address || '--'}</Col>
            </Row>
            <Row>
                <Col span={3}>Wallet private key:</Col>
                <Col span={16}>{privateKey || '--'}</Col>
            </Row>
            <Row>
                <Col span={3}>Wallet Balance:</Col>
                <Col span={4}>{balance || 0} &nbsp; &nbsp; &nbsp;<Button type='primary' onClick={getBalance} size='small'>Refresh Balance</Button></Col>
            </Row> */}
        </div>
    )
}

export default Wallet
