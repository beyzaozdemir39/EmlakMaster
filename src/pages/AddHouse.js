import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/AddHouse.css';

const { Option } = Select;

const AddHouse = ({ onAddHouse }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const newHouse = {
      id: Date.now(),
      ...values,
      image,
    };

    const existingHouses = JSON.parse(localStorage.getItem('newHousesData')) || [];
    const updatedHouses = [...existingHouses, newHouse];
    localStorage.setItem('newHousesData', JSON.stringify(updatedHouses));

    message.success('Ev başarıyla eklendi!');
    onAddHouse(newHouse);
    navigate('/');
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <div className="add-house">
      <h2>Ev Ekle</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Başlık" rules={[{ required: true, message: 'Lütfen başlık giriniz' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Açıklama" rules={[{ required: true, message: 'Lütfen açıklama giriniz' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="location" label="Konum" rules={[{ required: true, message: 'Lütfen konum giriniz' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Fiyat" rules={[{ required: true, message: 'Lütfen fiyat giriniz' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="rooms" label="Oda Sayısı" rules={[{ required: true, message: 'Lütfen oda sayısını giriniz' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="type" label="Tür" rules={[{ required: true, message: 'Lütfen tür seçiniz' }]}>
          <Select>
            <Option value="Kiralık">Kiralık</Option>
            <Option value="Satılık">Satılık</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Fotoğraf">
          <Upload beforeUpload={handleImageUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Fotoğraf Yükle</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Ekle</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddHouse;
