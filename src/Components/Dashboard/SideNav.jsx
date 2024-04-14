

import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// const items = [
//   getItem('اضافة مستخدم', '1', <ControlPointIcon  className='text-[20px]'/>),
//   getItem('اضافة الاماكن', '5',<ControlPointIcon  className='text-[20px]'/>),
//   getItem("جدول الايرادات", '2', <ContainerOutlined />),
//   getItem('جدول العربيات', '3', <ContainerOutlined />),
//   getItem("جدول المستخدمين", '4', <ContainerOutlined />),
//   getItem("جدول الافراد", '6', <ContainerOutlined />),
//   getItem("تسجيل الخروج", '7',   <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
//   <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   <path d="M13.332 14.1668L17.4987 10.0002L13.332 5.8335" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   <path d="M17.5 10H7.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// </svg>),
  
 
// ];
const items = [
  getItem("Add User", '1', <ControlPointIcon  className='text-[20px]'/>),
  getItem("Add Configration", '5',<ControlPointIcon  className='text-[20px]'/>),
  getItem("Revenue Schedule", '2', <ContainerOutlined />),
  getItem("Cars Schedule", '3', <ContainerOutlined />),
  getItem("Users Schedule", '4', <ContainerOutlined />),
  getItem("Persons schedule", '6', <ContainerOutlined />),
  getItem("Sign Out", '7',   <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="none">
  <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M13.332 14.1668L17.4987 10.0002L13.332 5.8335" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M17.5 10H7.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>),
  
 
];

export const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (key) => {
    if (key === '1') {
      // If the "اضافة مستخدم" item is clicked, navigate to the homepage
      navigate('/adduser');
    }
    if (key === '2') {
      // If the "اضافة مستخدم" item is clicked, navigate to the homepage
      navigate('/revenueschedule');
    }
    if (key === '3') {
      // If the "اضافة مستخدم" item is clicked, navigate to the homepage
      navigate('/carsschedule');
    }
    if (key === '4') {
      // If the "اضافة مستخدم" item is clicked, navigate to the homepage
      navigate('/userschedule');
    }
    if (key === '5') {
      // If the "اضافة مستخدم" item is clicked, navigate to the homepage
      navigate('/addSlots');
    }
    if (key === '6') {
      // If the "اضافة مستخدم" item is clicked, navigate to the homepage
      navigate('/addPersons');
    }
    if (key === '7') {
      // If the "اضافة مستخدم" item is clicked, navigate to the homepage
      localStorage.removeItem("userId")
      navigate('/');

    }
  };
  return (
    <div
     

      mode="inline"
      theme="dark"
      className={` bg-white h-[100%]`}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
        className='text-red-500 bg-white'
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
      className='bg-white h-[100vh]'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        onClick={({ key }) => handleMenuClick(key)}
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
