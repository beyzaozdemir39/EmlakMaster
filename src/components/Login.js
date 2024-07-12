import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';  

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
   
    navigate('/');
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2>Giriş Yap</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Lütfen kullanıcı adınızı giriniz!' }]}>
            <Input placeholder="Kullanıcı Adı" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi giriniz!' }]} >
            <Input.Password placeholder="Şifre" />
          </Form.Item>

          <Form.Item>
            <Checkbox>Beni hatırla</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
