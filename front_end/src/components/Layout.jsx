import { Fragment, useState } from 'react';
import { Layout, Tabs } from 'antd';
// import { Routes, Route, Outlet, NavLink } from 'react-router-dom';

import Wallet from './Wallet';
import Mine from './Mine';
import TransferAccounts from './TransferAccounts';
// import Transition from './Transition';
import BlockChain from './BlockChain';
// import menus from 'constant/menus';
import { getBlocks, getPendingTransactions } from '@/service/index';
import './layout.less';

// const TabPane = Tabs.TabPane;
const { Header, Content } = Layout;

function LayoutWrapper() {
    const [activeKey, setActiveKey] = useState('wallet');
    const [pendingTransitions, setPendingTransitions] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const tabChange = key => {
        setActiveKey(key);
    }
    const refeshBlock = () => {
        getBlocks().then(res => {
            setBlocks(res.chain.chain)
        })
    }
    const refeshPendingTransactions = () => {
        getPendingTransactions().then(res=>{
            setPendingTransitions(res.pendingTransactions)
        })
    }

    const items = [
        {
            label: 'Wallet',
            key: 'wallet',
            children: <Wallet />
        },
        {
            label: 'TransferAccounts',
            key: 'transferAccounts',
            children: <TransferAccounts activeKey={activeKey} pendingTransitions={pendingTransitions
            } setPendingTransitions={(transaction)=>setPendingTransitions([...pendingTransitions,transaction])} />
        },
        {
            label: 'Mine',
            key: 'mine',
            children: <Mine setBlocks={block => setBlocks([...blocks, block])} />
        },
        {
            label: 'BlockChain',
            key: 'blockchain',
            children: <BlockChain pendingTransitions={pendingTransitions} blocks={blocks} refeshBlock={refeshBlock
} refeshPendingTransactions={refeshPendingTransactions}/>
        },
    ]
    return (
        <Layout className='custom_layout'>
            <Header className='custom_header'>My blockChain</Header>
            <Content className='custom_content'>
                <Tabs activeKey={activeKey} tabPosition='left' onChange={tabChange} items={items}>
                    {/* <TabPane key='wallet' label='Wallet' ><Wallet /></TabPane>
                    <TabPane key='transferAccounts' label='TransferAccounts'>
                        <Fragment>
                            <TransferAccounts />
                            <Transition />
                        </Fragment>
                        </TabPane>
                    <TabPane key='mine' label='Mine'><Mine /></TabPane>
                    <TabPane key='blockchain' label='Blockchain'><BlockChain/></TabPane> */}
                </Tabs>
            </Content>
        </Layout>
    )
}

export default LayoutWrapper
