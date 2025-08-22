import React from 'react'
import { Button, Row, Col, Input } from 'antd';
import { useState } from 'react';
import { mine } from '@/service/index';
import { useRef } from 'react';

function Mine({setBlocks}) {
    const [mineResult,setMineResult] = useState('');
    const inputRef =useRef(null);
    const mineByAddr =()=>{
        const address = inputRef.current.input.value;
        if (!address) {
            Modal.info({
                title: 'please input account address'
            })
            return;
        }
            mine(address).then(res=>{
                setMineResult(`${res.message},get${res.balance}`);
                setBlocks(res.block);
            });
    };
    return (
        <div className='mine'>
            <Row>
                <Col span={3}>Address:</Col>
                <Col span={6}><Input placeholder='please input address' ref={inputRef}/></Col>
                <Col span={4}><Button type='primary' onClick={mineByAddr} className='mine_btn'>Create Mine</Button></Col>
            </Row>
            <Row>
                <Col span={3}>Mine Result:</Col>
                <Col span={6}>{mineResult || '--'}</Col>
            </Row>
        </div>
    )
}

export default Mine
