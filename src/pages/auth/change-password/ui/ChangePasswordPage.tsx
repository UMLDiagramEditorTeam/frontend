import { useState } from 'react';
import { Button, Card, Form, Input, Result } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import '../../AuthPage.css';

import { routePaths } from '@/shared/config/routePaths';
import { changePassword } from '@/features/auth/model/changePassword';
import { useAuthError } from '@/features/auth/model/useAuthError';
import { AuthErrorModal } from '@/features/auth/model/AuthErrorModal';

interface ChangePasswordFormValues {
  password: string;
  confirm: string;
}

/**
 * установка нового пароля. юзер попадает сюда по ссылке из письма:
 *   /auth/password/change?user_id=...&code=...
 *
 * ПРЕДПОЛОЖЕНИЕ: бэк кладёт в ссылку user_id и code раздельными
 * query-параметрами (как и для confirm-account). если иначе — поправить
 * чтение searchParams.
 */
export const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { errorState, handleError, clearError } = useAuthError();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const userId = searchParams.get('user_id');
  const code = searchParams.get('code');

  const linkValid = !!userId && !!code;

  const performChange = async (values: ChangePasswordFormValues) => {
    if (!userId || !code) return;
    setIsSubmitting(true);
    try {
      await changePassword(userId, code, values.password, values.confirm);
      setDone(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinish = async (values: ChangePasswordFormValues) => {
    try {
      await performChange(values);
    } catch (error) {
      handleError(error, () => performChange(values));
    }
  };

  return (
    <div className="authContainer">
      <div className="authLogoWrapper">
        <img src="/logo.png" alt="Logo" className="authLogoImg" />
      </div>
      <Card title={done ? undefined : 'Новый пароль'} className="authCard">
        {!linkValid ? (
          <Result
            status="error"
            title="Ссылка некорректна"
            subTitle="Ссылка для сброса пароля устарела или повреждена. Запросите новую."
            extra={
              <Button
                type="primary"
                onClick={() => navigate(routePaths.forgotPassword)}
              >
                Запросить заново
              </Button>
            }
          />
        ) : done ? (
          <Result
            status="success"
            title="Пароль изменён"
            subTitle="Теперь войдите в систему с новым паролем."
            extra={
              <Button type="primary" onClick={() => navigate(routePaths.login)}>
                Войти
              </Button>
            }
          />
        ) : (
          <Form
            name="change_password"
            onFinish={onFinish}
            size="large"
            layout="vertical"
            disabled={isSubmitting}
          >
            <Form.Item
              name="password"
              label="Новый пароль"
              rules={[
                { required: true, message: 'Введите новый пароль!' },
                { min: 6, message: 'Минимум 6 символов' },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Новый пароль"
              />
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
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>

      <AuthErrorModal errorState={errorState} onClose={clearError} />
    </div>
  );
};
