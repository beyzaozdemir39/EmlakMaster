import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/login');
  };

  return (
    <div className="header-container">
      <div className="logo">EmlakMaster</div>
      <div className="menu">
        <Link to="/" className="menu-item">Anasayfa</Link>
        <Link to="/add" className="menu-item">Ev Ekle</Link>
        <Link to="/requests" className="menu-item">Müşteri Talepleri</Link>
        <span className="menu-item logout" onClick={handleLogout}>Çıkış Yap</span>
      </div>
    </div>
  );
};

export default Header;
