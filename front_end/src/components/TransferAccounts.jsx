import { useState, useRef, useEffect } from 'react';
import { Button, Row, Col, Input, Modal, Select } from 'antd';
import { transferAccounts } from '@/service/index';
import { getAccounts} from '@/service/index';

function TransferAccounts({ pendingTransitions,setPendingTransitions }) {
    // const senderRef = useRef(null);
    // const recieverRef = useRef(null);
    const amountRef = useRef(null);
    const [accounts, setAccounts]=useState(null); 
    const [senderAddr, setSenderAddr]=useState(null); 
    const [recieverAddr, setRecieverAddr]=useState(null); 
    
    
    useEffect(()=>{
        getAccounts().then(res=>{
            const wallets=Object.values(res.wallets);
            setAccounts(wallets.map(({ accountName,address
            }) => ({ value: address, label: accountName})));
        })
    })
    const send = () => {
        const amount = amountRef.current.input.value;
        if (!senderAddr || !recieverAddr || !amount) {
            Modal.info({
                title: 'please check sender address,reciever address and amount value'
            })
            return;
        }
        transferAccounts({ fromAddress:senderAddr, toAddress:recieverAddr, amount }).then(res => {
            setPendingTransitions(res.transaction);
        })
    }

    const senderOnChange = value=>{
        setSenderAddr(value);
    }
    const recieverOnChange = value=>{
        setRecieverAddr(value);
    }
    
    return (
        <div className='transfer_accounts'>
            <Row>
                <Col span={3}>sender address:</Col>
                <Col span={6}><Select placeholder='please select sender wallet account' value={senderAddr} options={accounts} onChange={senderOnChange} /></Col>
            </Row>
            <Row>
                <Col span={3}>reciever address:</Col>
                <Col span={6}><Select placeholder='please select reciever wallet account' value={recieverAddr} options={accounts} onChange={recieverOnChange} /></Col>
            </Row>
            <Row>
                <Col span={3}>amount:</Col>
                <Col span={6}><Input placeholder='please input amount' ref={amountRef} /></Col>
            </Row>
            <Row>
                <Col span={12} style={{ textAlign: 'center' }}><Button type='primary' onClick={send} >Send</Button></Col>
            </Row>
            <Row>
                <Col span={12}>
                    {
                        pendingTransitions && pendingTransitions.length>0 ? '交易已添加到待处理列表，等待挖矿确认交易' : ''
                    }
                    {/* {
                        transaction ? '交易已添加到待处理列表，等待挖矿确认交易' + `from ${transaction.fromAddress} to ${transaction.toAddress}, amount:${transferAccounts.amount}` : ''
                    } */}
                </Col>
            </Row>
        </div>
    )
}

export default TransferAccounts
