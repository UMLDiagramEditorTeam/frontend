import { useState } from 'react';
import { Button, Form, Card, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../AuthPage.css';

import { routePaths } from '@/shared/config/routePaths.ts';
import { useAuth } from '@/app/providers/auth-context';
import { useAuthError } from '@/features/auth/model/useAuthError';
import { AuthErrorModal } from '@/features/auth/model/AuthErrorModal';

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { errorState, handleError, clearError } = useAuthError();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const performLogin = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      navigate(routePaths.projects);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinish = async (values: LoginFormValues) => {
    try {
      await performLogin(values);
    } catch (error) {
      handleError(error, () => performLogin(values));
    }
  };

  return (
    <div className="authContainer">
      <div className="authLogoWrapper">
        <img src="/logo.png" alt="Logo" className="authLogoImg" />
      </div>
      <Card title="Вход в систему" className="authCard">
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          disabled={isSubmitting}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
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
            {/* TODO: forgot-password flow */}
            <a
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={(e) => e.preventDefault()}
            >
              Забыли пароль?
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="formButton"
              loading={isSubmitting}
            >
              Войти
            </Button>
          </Form.Item>

          <div className="footerlink">
            Или{' '}
            <a onClick={() => navigate(routePaths.register)}>
              зарегистрироваться
            </a>
          </div>
        </Form>
      </Card>

      <AuthErrorModal errorState={errorState} onClose={clearError} />
    </div>
  );
};
