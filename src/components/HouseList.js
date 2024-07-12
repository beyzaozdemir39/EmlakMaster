import React, { useState } from 'react';
import { List, Card, Modal } from 'antd';

const HouseList = ({ houses }) => {
  const [visible, setVisible] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

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
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={houses}
        renderItem={house => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={house.title} src={house.image} />}
              onClick={() => showModal(house)}>
              <Card.Meta title={house.title} />
            </Card>
          </List.Item>
        )}
      />
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
          </div>
        )}
      </Modal>
    </>
  );
};
export default HouseList;
