import React from 'react';
import { Button } from 'antd';
import {
  FolderAddOutlined,
  SearchOutlined,
  FilterOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './ProjectsPage.css';
import logo from '@/shared/assets/logo.png';

export const ProjectsPage = () => {
  return (
    <div className="ProjectsLayout">
      <header className="header">
        <div className="headerLogo">
          <img src={logo} alt="headerLogo" className="headerLogoImg" /> UML
          Building
        </div>

        <div className="headerActions">
          <SearchOutlined className="headerIcon" />
          <FilterOutlined className="headerIcon" />
          <SettingOutlined className="headerIcon" />

          <div className="avatar">
            <UserOutlined />
          </div>
        </div>
      </header>

      <main className="content">
        <div className="emptyState">
          <FolderAddOutlined className="emptyIcon" />

          <h2 className="emptyTitle">Пока нет проектов</h2>

          <p className="emptyDescription">
            Начните создавать свой первый UML-проект, чтобы визуализировать
            структуру вашей системы.
          </p>

          <Button type="primary" size="large" icon={<FolderAddOutlined />}>
            Создать проект
          </Button>
        </div>
      </main>
    </div>
  );
};
