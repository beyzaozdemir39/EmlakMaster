import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Çıkış yapıldı');
    
    navigate('/login'); 
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Çıkış Yap
    </Button>
  );
};

export default Logout;
