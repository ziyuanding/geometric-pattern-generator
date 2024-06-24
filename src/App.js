import React, { useState } from 'react';

import { initialData } from './initialData';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './Home'
import Gallery from './Gallery'
import './App.css';
const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ flex: 1, minWidth: 0 }}
          > <Menu.Item key="1">
              <Link to="/geometric-pattern-generator">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/gallery">Gallery</Link>
            </Menu.Item>
          </Menu>
          <div>
            <a href="https://www.buymeacoffee.com/ziyuanding" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: '35%', width: '35%' }} />
            </a>
          </div>
        </Header>
        <Content style={{ padding: '0 48px' }}>
          <Routes>
            <Route path="/geometric-pattern-generator" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          geometric-pattern-generator ©{new Date().getFullYear()} Created by Ziyuan Ding
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
