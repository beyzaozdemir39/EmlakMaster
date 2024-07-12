import React from 'react';
import { Form, Input, Button } from 'antd';

const HouseForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  return (
    <Form
      name="house-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Lütfen ev başlığını giriniz!' }]}
      >
        <Input placeholder="Ev Başlığı" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: 'Lütfen ev açıklamasını giriniz!' }]}
      >
        <Input.TextArea placeholder="Ev Açıklaması" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ekle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HouseForm;
