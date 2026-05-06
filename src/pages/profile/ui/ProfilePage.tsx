import React from 'react';
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

const { Title, Text } = Typography;

export const ProfilePage = () => {
  const navigate = useNavigate();

  // Временные данные пользователя
  const user = {
    name: 'Алексей Иванов',
    email: 'alexey.ivanov@example.com',
    registeredAt: '15 октября 2023',
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate(routePaths.login);
  };

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
          <Text type="secondary">На платформе с {user.registeredAt}</Text>
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
