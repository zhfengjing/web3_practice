import React from 'react'
import { Button, Row, Col ,Card} from 'antd';
import { useState } from 'react';

function Transition(props) {
    const [pendingTransitions, setPendingTransitions] = useState([]);
    return (
        <div>
            {
                pendingTransitions.length > 0 && pendingTransitions.map((item,index)=>{
                    return <Card title="transition">
                        <Row>
                            <Col span={3}>transition hash:</Col>
                            <Col span={10}>{transitionHash}</Col>
                        </Row>
                        <Row>
                            <Col span={3}>transition remark:</Col>
                            <Col span={10}>{transitionRemark}</Col>
                        </Row>
                    </Card>
                })
            }
           
        </div>
    )
}

export default Transition