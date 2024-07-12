import React, { useState } from 'react';
import { Form, Input, Button, List } from 'antd';

const HouseFilter = () => {
  const [filteredHouses, setFilteredHouses] = useState([]);

  const onFinish = (values) => {
    console.log('Filtreleme kriterleri:', values);
    const results = [
      { title: 'Filtrelenmiş Ev 1', description: 'Açıklama 1' },
      { title: 'Filtrelenmiş Ev 2', description: 'Açıklama 2' },
    ];
    setFilteredHouses(results);
  };
  return (
    <div>
      <Form
        name="house-filter"
        onFinish={onFinish}
      >
        <Form.Item
          name="location"
        >
          <Input placeholder="Konum" />
        </Form.Item>

        <Form.Item
          name="price"
        >
          <Input placeholder="Fiyat" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Filtrele
          </Button>
        </Form.Item>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={filteredHouses}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default HouseFilter;
