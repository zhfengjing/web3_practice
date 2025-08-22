import React from 'react'
import { Button, Row, Col, Card } from 'antd';
import { useState } from 'react';

function BlockChain({ pendingTransitions, blocks, refeshPendingTransactions, refeshBlock }) {
  
    return (
        <div className='block_chain'>
            <header style={{textAlign:'center',fontSize:'22px', fontWeight:'600',padding:'24px 0'}}>Blockchain details</header>
            <div className='block_section'>
                <div className="left">
                    <header>PendingTransactions <Button type='primary' onClick={refeshPendingTransactions} className='refresh_btn'>Refresh PendingTransaction</Button></header>
                    
                    {
                        pendingTransitions && pendingTransitions.length>0 && pendingTransitions.map(({ fromAddress, toAddress, amount },index) => {
                            return <Card title={`PendingTransition${index + 1}`}>
                                <Row>
                                    <Col span={4}>From:</Col>
                                    <Col span={20} className='value'>{fromAddress || 'get from system'}</Col>
                                </Row>
                                <Row>
                                    <Col span={4}>To:</Col>
                                    <Col span={20} className='value'>{toAddress}</Col>
                                </Row>
                                <Row>
                                    <Col span={4}>Amount:</Col>
                                    <Col span={20} className='value'>{amount}</Col>
                                </Row>

                            </Card>
                        })
                    }
                </div>
                <div className="right">
                    <header>Block <Button type='primary' onClick={refeshBlock} className='refresh_btn'>Refresh Block</Button></header>
                    
                    {
                        blocks && blocks.length > 0 && blocks.map(({ hash, previousHash, nonce,transactionNum },index) => {
                            return <Card title={`Block${index}`}>
                                <Row>
                                    <Col span={4}>Hash:</Col>
                                    <Col span={20} className='value'>{hash}</Col>
                                </Row>
                                <Row>
                                    <Col span={5}>PreviousHash:</Col>
                                    <Col span={19} className='value'>{previousHash}</Col>
                                </Row>
                                <Row>
                                    <Col span={4}>Nonce:</Col>
                                    <Col span={20} className='value'>{nonce}</Col>
                                </Row>
                                <Row>
                                    <Col span={4}>Transaction Number:</Col>
                                    <Col span={20} className='value'>{transactionNum}</Col>
                                </Row>

                            </Card>
                        })
                    }
                </div>
            </div>


        </div>
    )
}

export default BlockChain
