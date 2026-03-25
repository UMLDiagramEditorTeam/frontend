import React from 'react';
import { Button, Form, Card, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../AuthPage.css';
import logo from '@/shared/assets/logo.png';

export const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (values: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    console.log(values);
    navigate('/projects');
  };

  return (
    <div className="authContainer">
      <div className="authLogoWrapper">
        <img src={logo} alt="Logo" className="authLogoImg" />
      </div>
      <Card title="Вход в систему" className="authCard">
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Логин" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>
            <a style={{ float: 'right' }} href="">
              Забыли пароль?
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="formButton">
              Войти
            </Button>
          </Form.Item>

          <div className="footerlink">
            Или <a onClick={() => navigate('/register')}>зарегистрироваться</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};
