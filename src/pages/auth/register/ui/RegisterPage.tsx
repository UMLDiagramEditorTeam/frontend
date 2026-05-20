import { useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import '../../AuthPage.css';

import { routePaths } from '@/shared/config/routePaths.ts';
import { useAuth } from '@/app/providers/auth-context';
import { useAuthError } from '@/features/auth/model/useAuthError';
import { AuthErrorModal } from '@/features/auth/model/AuthErrorModal';

interface RegisterFormValues {
  email: string;
  name: string;
  password: string;
  confirm: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { errorState, handleError, clearError } = useAuthError();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const performRegister = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      await register(values.name, values.email, values.password);
      navigate(routePaths.projects);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinish = async (values: RegisterFormValues) => {
    try {
      await performRegister(values);
    } catch (error) {
      handleError(error, () => performRegister(values));
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
          disabled={isSubmitting}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Введите корректный Email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="name"
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
            <Button
              type="primary"
              htmlType="submit"
              className="formButton"
              loading={isSubmitting}
            >
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div className="footerlink">
            Уже есть аккаунт?{' '}
            <a onClick={() => navigate(routePaths.login)}>Войти</a>
          </div>
        </Form>
      </Card>

      <AuthErrorModal errorState={errorState} onClose={clearError} />
    </div>
  );
};
