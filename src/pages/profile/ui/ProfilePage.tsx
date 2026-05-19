import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Typography, Divider, Spin } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  MailOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import './ProfilePage.css';

import { routePaths } from '@/shared/config/routePaths';
import { getMe } from '@/features/auth/model/getMe';
import { logout } from '@/features/auth/model/logout';
import { useAuthError } from '@/features/auth/model/useAuthError';
import { AuthErrorModal } from '@/features/auth/model/AuthErrorModal';
import type { User } from '@/features/auth/model/types';

const { Title, Text } = Typography;

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
  const { errorState, handleError, clearError } = useAuthError();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ловим ошибки
  const performFetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const userData = await getMe();
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadProfile = useCallback(() => {
    performFetchUser().catch((error) => handleError(error, performFetchUser));
  }, [performFetchUser, handleError]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const performLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate(routePaths.login);
    } finally {
      setIsLoggingOut(false);
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    performLogout().catch((error) => handleError(error, performLogout));
  };

  if (isLoading) {
    return (
      <div className="profileLayout">
        <div
          className="profileCard"
          style={{ textAlign: 'center', padding: '40px' }}
        >
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="profileLayout">
      <div className="profileCard">
        {user ? (
          <>
            <div className="profileHeader">
              <Avatar
                size={80}
                icon={<UserOutlined />}
                className="profileAvatar"
              />
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
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Text type="secondary">Не удалось загрузить профиль</Text>
            <div style={{ marginTop: 16 }}>
              <Button onClick={loadProfile}>Попробовать снова</Button>
            </div>
          </div>
        )}
      </div>

      <AuthErrorModal errorState={errorState} onClose={clearError} />
    </div>
  );
};
