import { useState } from 'react';
import { Button, Row, Col, Input, Modal } from 'antd';
import { transferAccounts } from '@/service/index';
import { useRef } from 'react';

function TransferAccounts({ pendingTransitions,setPendingTransitions }) {
    const senderRef = useRef(null);
    const recieverRef = useRef(null);
    const amountRef = useRef(null);
    // const [transaction,setTransaction]=useState(null); 
    const send = () => {
        const fromAddress = senderRef.current.input.value;
        const toAddress = recieverRef.current.input.value;
        const amount = amountRef.current.input.value;
        if (!fromAddress || !toAddress || !amount) {
            Modal.info({
                title: 'please check sender address,reciever address and amount value'
            })
            return;
        }
        transferAccounts({ fromAddress, toAddress, amount }).then(res => {
            setPendingTransitions(res.transaction);
        })
    }
    return (
        <div className='transfer_accounts'>
            <Row>
                <Col span={3}>sender address:</Col>
                <Col span={9}><Input placeholder='please input sender wallet address' ref={senderRef} /></Col>
            </Row>
            <Row>
                <Col span={3}>reciever address:</Col>
                <Col span={9}><Input placeholder='please input reciever wallet address' ref={recieverRef} /></Col>
            </Row>
            <Row>
                <Col span={3}>amount:</Col>
                <Col span={9}><Input placeholder='please input amount' ref={amountRef} /></Col>
            </Row>
            <Row>
                <Col span={12} style={{ textAlign: 'center' }}><Button type='primary' onClick={send} >Send</Button></Col>
            </Row>
            <Row>
                <Col span={12}>
                    {
                        pendingTransitions ? '交易已添加到待处理列表，等待挖矿确认交易' : ''
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
