import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import logo from '@/shared/assets/logo.png';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = (values: {
    email: string;
    username: string;
    password: string;
    confirm: string;
  }) => {
    console.log(values);
    navigate('/projects');
  };

  return (
    <div className="authContainer">
      <div className="authLogoWrapper">
        <img src={logo} alt="Logo" className="authLogoImg" />
      </div>
      <Card title="Регистрация" className="authCard">
        <Form
          name="register"
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Введите корректны Email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="username"
            label="Логин"
            rules={[{ required: true, message: 'Введите логин!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Логин" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: 'Введите пароль!' }]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Подтвердите пароль"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Подтвердите пароль!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Подтвердите пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="formButton">
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div className="footerrlink">
            Уже есть аккаунт? <a onClick={() => navigate('/login')}>Войти</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};
