import React, { useState, useEffect } from 'react';
import { Card, List, Input, InputNumber, Button, Select, Row, Col, Modal } from 'antd';
import housesData from '../data/houses.json';
import '../styles/Home.css';

const { Option } = Select;

const Home = () => {
  const [houses, setHouses] = useState(housesData);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: null,
    maxPrice: null,
    minRooms: null,
    type: ''
  });
  const [visible, setVisible] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    const newHouses = JSON.parse(localStorage.getItem('newHousesData')) || [];
    setHouses([...housesData, ...newHouses]);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleFilter = () => {
    const { location, minPrice, maxPrice, minRooms, type } = filters;
    const filtered = houses.filter(house => {
      const matchesLocation = !location || house.location.includes(location);
      const matchesMinPrice = !minPrice || house.price >= minPrice;
      const matchesMaxPrice = !maxPrice || house.price <= maxPrice;
      const matchesMinRooms = !minRooms || house.rooms >= minRooms;
      const matchesType = !type || house.type === type;
      return matchesLocation && matchesMinPrice && matchesMaxPrice && matchesMinRooms && matchesType;
    });
    setHouses(filtered);
  };

  const showModal = (house) => {
    setSelectedHouse(house);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="home">
      <Card className="filter-card">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Konum"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <InputNumber
              placeholder="Min Fiyat"
              value={filters.minPrice}
              onChange={(value) => handleFilterChange('minPrice', value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <InputNumber
              placeholder="Max Fiyat"
              value={filters.maxPrice}
              onChange={(value) => handleFilterChange('maxPrice', value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <InputNumber
              placeholder="Min Oda Sayısı"
              value={filters.minRooms}
              onChange={(value) => handleFilterChange('minRooms', value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Kiralık veya Satılık"
              value={filters.type}
              onChange={(value) => handleFilterChange('type', value)}
              style={{ width: '100%' }}
            >
              <Option value="Kiralık">Kiralık</Option>
              <Option value="Satılık">Satılık</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button
              type="primary"
              onClick={handleFilter}
              style={{ width: '100%' }}
            >
              Filtrele
            </Button>
          </Col>
        </Row>
      </Card>

      <div className="house-list">
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={houses}
          renderItem={house => (
            <List.Item>
              <Card
                hoverable
                cover={<img alt={house.title} src={house.image} />}
                onClick={() => showModal(house)}
              >
                <Card.Meta title={house.title} />
              </Card>
            </List.Item>
          )}
        />
      </div>

      <Modal
        title={selectedHouse?.title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedHouse && (
          <div>
            <p>{selectedHouse.description}</p>
            <p>Konum: {selectedHouse.location}</p>
            <p>Fiyat: {selectedHouse.price} TL</p>
            <p>Oda Sayısı: {selectedHouse.rooms}</p>
            <p>Tür: {selectedHouse.type}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
