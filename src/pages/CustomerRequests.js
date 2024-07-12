import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, notification, Card, Select } from 'antd';
import HouseList from '../components/HouseList';
import housesData from '../data/houses.json';
import '../styles/CustomerRequests.css';

const { Option } = Select;

const CustomerRequests = () => {
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [email, setEmail] = useState('');

  const onFinish = (values) => {
    const { mustHave, mustNotHave, optional } = values;

    const filtered = housesData.filter(house => {
      const mustHaveMatch = !mustHave || Object.keys(mustHave).every(key => !mustHave[key] || house[key] === mustHave[key]);
      const mustNotHaveMatch = !mustNotHave || Object.keys(mustNotHave).every(key => !mustNotHave[key] || house[key] !== mustNotHave[key]);
      const optionalMatch = !optional || Object.keys(optional).every(key => !optional[key] || house[key] === optional[key]);
      return mustHaveMatch && mustNotHaveMatch && optionalMatch;
    });

    setFilteredHouses(filtered);
  };

  const handleSendEmail = () => {
    const houseList = filteredHouses.map(house => ({
      title: house.title,
      description: house.description,
      location: house.location,
      price: house.price,
      rooms: house.rooms,
      image: house.image,
    }));

    const emailContent = `
      <h2>Uygun Evler</h2>
      ${houseList.map(house => `
        <div>
          <h3>${house.title}</h3>
          <p>${house.description}</p>
          <p>Konum: ${house.location}</p>
          <p>Fiyat: ${house.price} TL</p>
          <p>Oda Sayısı: ${house.rooms}</p>
          ${house.image ? `<img src="${house.image}" alt="${house.title}" style="width:100%;" />` : ''}
        </div>
      `).join('')}
    `;

    fetch('http://localhost:3001/send-email', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: 'Uygun Evler Listesi',
        content: emailContent,
      }),
    })
      .then(response => response.json())
      .then(data => {
        notification.success({
          message: 'E-posta Gönderildi',
          description: 'Uygun evler listesi başarıyla gönderildi.',
        });
        console.log('E-posta gönderildi:', data);
      })
      .catch(error => {
        notification.error({
          message: 'E-posta Gönderilemedi',
          description: 'E-posta gönderme işlemi sırasında bir hata oluştu.',
        });
        console.error('E-posta gönderme hatası:', error);
      });
  };

  return (
    <div className="customer-requests">
      <Card className="filter-card">
        <h2>Müşteri Talepleri</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <h3>Mutlaka Olmalı</h3>
          <Form.Item name={['mustHave', 'location']} label="Konum">
            <Input placeholder="Konum" />
          </Form.Item>
          <Form.Item name={['mustHave', 'price']} label="Max Fiyat">
            <InputNumber placeholder="Max Fiyat" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={['mustHave', 'rooms']} label="Min Oda Sayısı">
            <InputNumber placeholder="Min Oda Sayısı" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={['mustHave', 'type']} label="Tip">
            <Select placeholder="Kiralık veya Satılık" style={{ width: '100%' }}>
              <Option value="Kiralık">Kiralık</Option>
              <Option value="Satılık">Satılık</Option>
            </Select>
          </Form.Item>

          <h3>Mutlaka Olmamalı</h3>
          <Form.Item name={['mustNotHave', 'location']} label="Konum">
            <Input placeholder="Konum" />
          </Form.Item>
          <Form.Item name={['mustNotHave', 'price']} label="Max Fiyat">
            <InputNumber placeholder="Max Fiyat" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={['mustNotHave', 'rooms']} label="Min Oda Sayısı">
            <InputNumber placeholder="Min Oda Sayısı" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={['mustNotHave', 'type']} label="Tip">
            <Select placeholder="Kiralık veya Satılık" style={{ width: '100%' }}>
              <Option value="Kiralık">Kiralık</Option>
              <Option value="Satılık">Satılık</Option>
            </Select>
          </Form.Item>

          <h3>Olsa da Olur</h3>
          <Form.Item name={['optional', 'location']} label="Konum">
            <Input placeholder="Konum" />
          </Form.Item>
          <Form.Item name={['optional', 'price']} label="Max Fiyat">
            <InputNumber placeholder="Max Fiyat" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={['optional', 'rooms']} label="Min Oda Sayısı">
            <InputNumber placeholder="Min Oda Sayısı" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={['optional', 'type']} label="Tip">
            <Select placeholder="Kiralık veya Satılık" style={{ width: '100%' }}>
              <Option value="Kiralık">Kiralık</Option>
              <Option value="Satılık">Satılık</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Filtrele</Button>
          </Form.Item>
        </Form>
      </Card>

      <h2>Uygun Evler</h2>
      <HouseList houses={filteredHouses} />

      {filteredHouses.length > 0 && (
        <div className="email-section">
          <Card className="email-card">
            <h3>E-posta ile Gönder</h3>
            <Input placeholder="E-posta Adresi" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="primary" onClick={handleSendEmail} style={{ marginTop: '8px' }}>Gönder</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerRequests;
