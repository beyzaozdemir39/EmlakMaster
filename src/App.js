import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './pages/Home';
import AddHouse from './pages/AddHouse';
import CustomerRequests from './pages/CustomerRequests';
import Login from './components/Login';
import Header from './components/Header';
import './styles/App.css';

const { Content, Footer } = Layout;

const App = () => {
  const [houses, setHouses] = useState(JSON.parse(localStorage.getItem('housesData')) || []);

  const handleAddHouse = (newHouse) => {
    setHouses([...houses, newHouse]);
  };

  return (
    <Router>
      <Layout className="layout">
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddHouse onAddHouse={handleAddHouse} />} />
              <Route path="/requests" element={<CustomerRequests />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>EmlakMaster ©2024</Footer>
      </Layout>
    </Router>
  );
};

export default App;
