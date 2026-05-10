import { Button, Card, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

import { register } from '@/features/auth/model/register';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values: {
    email: string;
    name: string;
    password: string;
    confirm: string;
  }) => {
    try {
      const user = await register(values.name, values.email, values.password);
      console.log('Успешная регистрация:', user);
      navigate('/projects');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      // добавить уведомление
    }
  };

  return (
    <div className="authContainer">
      <div className="authLogoWrapper">
        <img src="/logo.png" alt="Logo" className="authLogoImg" />
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
            name="name"
            label="логин"
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

          <div className="footerlink">
            Уже есть аккаунт? <a onClick={() => navigate('/login')}>Войти</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};
