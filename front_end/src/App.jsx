// import { useState } from 'react'
import LayoutWrapper from '@/components/Layout';
import { ConfigProvider} from 'antd';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Wallet from '@/components/Wallet';
// import Mine from '@/components/Mine';
// import Transition from '@/components/Transition';
// import BlockChain from '@/components/BlockChain';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    // children:[
    //   {
    //     path:'/wallet',
    //     element: <Wallet />
    //   },
    //   {
    //     path:'/mine',
    //     element: <Mine />
    //   },
    //   {
    //     path:'/transition',
    //     element: <Transition />
    //   },
    //   {
    //     path:'/blockChain',
    //     element: <BlockChain />
    //   },
    // ]
  },
]);
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>

  )
}

export default App
