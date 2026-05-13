import { Button, Form, Card, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../AuthPage.css';
import logo from '../../../../../public/logo.png';

import { routePaths } from '@/shared/config/routePaths.ts';
import { login } from '@/features/auth/model/login';
import { useAuthError } from '@/features/auth/model/useAuthError';
import { AuthErrorModal } from '@/features/auth/model/AuthErrorModal';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { errorState, handleError, clearError } = useAuthError();

  const performLogin = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    const user = await login(values.email, values.password);
    console.log('Успешный вход:', user);
    navigate(routePaths.projects);
  };

  const onFinish = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    try {
      await performLogin(values);
    } catch (error) {
      handleError(error, () => performLogin(values));
    }
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

      <AuthErrorModal errorState={errorState} onClose={clearError} />
    </div>
  );
};
