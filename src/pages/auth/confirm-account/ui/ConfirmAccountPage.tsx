import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Result, Spin, Button, message } from 'antd';
import '../../AuthPage.css';

import { routePaths } from '@/shared/config/routePaths';
import { confirmAccount } from '@/features/auth/model/confirmAccount';
import { useAuthError } from '@/features/auth/model/useAuthError';
import { AuthErrorModal } from '@/features/auth/model/AuthErrorModal';

type Status = 'pending' | 'success' | 'error';

/**
 * страница подтверждения аккаунта.
 * юзер попадает сюда по ссылке из письма:
 *   /auth/confirm-account?user_id=...&code=...
 *
 * ПРЕДПОЛОЖЕНИЕ: бэк кладёт в ссылку именно user_id и code раздельными
 * query-параметрами. если формат другой (например, один token) —
 * поправить чтение searchParams ниже.
 */
export const ConfirmAccountPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { errorState, handleError, clearError } = useAuthError();
  const [status, setStatus] = useState<Status>('pending');

  const userId = searchParams.get('user_id');
  const code = searchParams.get('code');

  // защита от двойного вызова в StrictMode (effect срабатывает дважды в dev)
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const run = async () => {
      if (!userId || !code) {
        setStatus('error');
        message.error('Ссылка подтверждения некорректна или устарела');
        return;
      }

      try {
        await confirmAccount(userId, code);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        handleError(error, async () => {
          await confirmAccount(userId, code);
          setStatus('success');
        });
      }
    };

    void run();
  }, [userId, code, handleError]);

  return (
    <div className="authContainer">
      <div className="authLogoWrapper">
        <img src="/logo.png" alt="Logo" className="authLogoImg" />
      </div>
      <Card className="authCard">
        {status === 'pending' && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <Spin size="large" />
            <p style={{ marginTop: 16 }}>Подтверждаем аккаунт…</p>
          </div>
        )}

        {status === 'success' && (
          <Result
            status="success"
            title="Аккаунт подтверждён!"
            subTitle="Теперь вы можете войти в систему."
            extra={
              <Button type="primary" onClick={() => navigate(routePaths.login)}>
                Войти
              </Button>
            }
          />
        )}

        {status === 'error' && (
          <Result
            status="error"
            title="Не удалось подтвердить аккаунт"
            subTitle="Ссылка некорректна или устарела. Попробуйте зарегистрироваться заново или запросить новое письмо."
            extra={
              <Button onClick={() => navigate(routePaths.login)}>
                На страницу входа
              </Button>
            }
          />
        )}
      </Card>

      <AuthErrorModal errorState={errorState} onClose={clearError} />
    </div>
  );
};
