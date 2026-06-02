import { useState } from 'react';
import { Button, Card, Form, Input, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import '../../AuthPage.css';

import { routePaths } from '@/shared/config/routePaths';
import { requestPasswordReset } from '@/features/auth/model/requestPasswordReset';
import { useAuthError } from '@/features/auth/model/useAuthError';
import { AuthErrorModal } from '@/features/auth/model/AuthErrorModal';

interface ForgotPasswordFormValues {
  email: string;
}

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { errorState, handleError, clearError } = useAuthError();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const performReset = async (values: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    try {
      await requestPasswordReset(values.email);
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinish = async (values: ForgotPasswordFormValues) => {
    try {
      await performReset(values);
    } catch (error) {
      handleError(error, () => performReset(values));
    }
  };

  return (
    <div className="authContainer">
      <div className="authLogoWrapper">
        <img src="/logo.png" alt="Logo" className="authLogoImg" />
      </div>
      <Card
        title={sent ? undefined : 'Восстановление пароля'}
        className="authCard"
      >
        {sent ? (
          <Result
            status="success"
            title="Письмо отправлено"
            subTitle="Если аккаунт с таким email существует, на него придёт ссылка для сброса пароля. Проверьте почту."
            extra={
              <Button type="primary" onClick={() => navigate(routePaths.login)}>
                Вернуться ко входу
              </Button>
            }
          />
        ) : (
          <Form
            name="forgot_password"
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="formButton"
                loading={isSubmitting}
              >
                Отправить ссылку
              </Button>
            </Form.Item>

            <div className="footerlink">
              Вспомнили пароль?{' '}
              <a onClick={() => navigate(routePaths.login)}>Войти</a>
            </div>
          </Form>
        )}
      </Card>

      <AuthErrorModal errorState={errorState} onClose={clearError} />
    </div>
  );
};
