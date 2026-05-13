import React, { useEffect, useState } from 'react';
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
import type { User } from '@/features/auth/model/types';

const { Title, Text } = Typography;

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
        // что тут должен показать ui ? ошибку ?
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate(routePaths.login);
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

  if (!user) {
    return (
      <div className="profileLayout">
        <div
          className="profileCard"
          style={{ textAlign: 'center', padding: '40px' }}
        >
          <Text type="secondary">Не удалось загрузить профиль</Text>
        </div>
      </div>
    );
  }

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
          <Text type="secondary">На платформе с {user.created_at}</Text>
        </div>

        <Divider />

        <Button
          danger
          type="text"
          icon={<LogoutOutlined />}
          size="large"
          onClick={handleLogout}
          style={{ width: '100%' }}
        >
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
};
