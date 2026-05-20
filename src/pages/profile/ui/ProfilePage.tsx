import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Typography, Divider } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  MailOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import './ProfilePage.css';

import { routePaths } from '@/shared/config/routePaths';
import { useAuth } from '@/app/providers/auth-context';
import { useAuthError } from '@/features/auth/model/useAuthError';
import { AuthErrorModal } from '@/features/auth/model/AuthErrorModal';

const { Title, Text } = Typography;

// форматирование даты к виду "15 января 2024"
// если бэк отдаст не-ISO — возвращаем как есть, чтобы не сломать рендер
const formatJoinDate = (raw: string): string => {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { errorState, handleError, clearError } = useAuthError();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const performLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate(routePaths.login);
    } finally {
      setIsLoggingOut(false);
    }
  }, [navigate, logout]);

  const handleLogoutClick = () => {
    performLogout().catch((error) => handleError(error, performLogout));
  };

  // PrivateRoute гарантирует, что user не null на этой странице.
  // Но TS этого не знает — страхуемся.
  if (!user) return null;

  return (
    <div className="profileLayout">
      <div className="profileCard">
        <div className="profileHeader">
          <Avatar size={80} icon={<UserOutlined />} className="profileAvatar" />
          <Title level={3} style={{ margin: '16px 0 4px' }}>
            {user.name}
          </Title>
          <Text
            type="secondary"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <MailOutlined /> {user.email}
          </Text>
        </div>

        <Divider />

        <div className="profileInfoRow">
          <CalendarOutlined style={{ color: '#8c8c8c', marginRight: 8 }} />
          <Text type="secondary">
            На платформе с {formatJoinDate(user.created_at)}
          </Text>
        </div>

        <Divider />

        <Button
          danger
          type="text"
          icon={<LogoutOutlined />}
          size="large"
          loading={isLoggingOut}
          onClick={handleLogoutClick}
          style={{ width: '100%' }}
        >
          Выйти из аккаунта
        </Button>
      </div>

      <AuthErrorModal errorState={errorState} onClose={clearError} />
    </div>
  );
};
