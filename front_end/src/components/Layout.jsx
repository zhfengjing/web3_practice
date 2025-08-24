import { Layout } from 'antd';
// import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import './layout.less';

const { Header, Content } = Layout;

function LayoutWrapper() {

    return (
        <Layout className='custom_layout'>
            <Header className='custom_header'>Web3 Homework</Header>
            <Content className='custom_content'>
                Content Section
            </Content>
        </Layout>
    )
}

export default LayoutWrapper