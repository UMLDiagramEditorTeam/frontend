import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Spin, message } from 'antd';
import {
  FolderAddOutlined,
  SearchOutlined,
  FilterOutlined,
  SettingOutlined,
  UserOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import './ProjectsPage.css';
import logo from '@/shared/assets/logo.png';
import { CreateProjectModal } from './CreateProjectModal';

interface Project {
  id: number;
  name: string;
  diagramType: string;
  updatedAt: string;
}

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateProject = (name: string, type: string) => {
    const newProject: Project = {
      id: Date.now(),
      name: name,
      diagramType: type,
      updatedAt: new Date().toISOString(),
    };
    setProjects([newProject, ...projects]);
    message.success('Проект создан!');
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
    message.success('Проект удален');
  };

  const getCardMenu = (projectId: number) => ({
    items: [
      {
        key: 'edit',
        label: 'Редактировать',
        icon: <EditOutlined />,
      },
      {
        key: 'delete',
        label: 'Удалить',
        icon: <DeleteOutlined />,
        danger: true,
      },
    ],
    onClick: (info: { key: string }) => {
      if (info.key === 'delete') {
        handleDelete(projectId);
      }
    },
  });
  const getColorByType = (type: string) => {
    const colors: Record<string, string> = {
      'Class Diagram': '#1890ff',
      'Sequence Diagram': '#52c41a',
    };
    return colors[type] || '#faad14';
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'Class Diagram':
        return <AppstoreOutlined />;
      case 'Sequence Diagram':
        return <ApartmentOutlined />;
      default:
        return <FolderAddOutlined />;
    }
  };

  return (
    <div className="projectsLayout">
      <header className="header">
        <div className="headerLogo">
          <img src={logo} alt="headerLogo" className="headerLogoImg" />
          UML Building
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
        {loading && (
          <div style={{ textAlign: 'center', marginTop: 100 }}>
            <Spin size="large" />
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="emptyState">
            <FolderAddOutlined className="emptyIcon" />
            <h2 className="emptyTitle">Пока нет проектов</h2>
            <p className="emptyDescription">
              Начните создавать свой первый UML-проект, чтобы визуализировать
              структуру вашей системы.
            </p>
            <Button
              type="primary"
              size="large"
              icon={<FolderAddOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Создать проект
            </Button>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <>
            <div className="listHeader">
              <h2 className="projectsCount">
                {projects.length} {projects.length === 1 ? 'проект' : 'проекта'}
              </h2>
              <Button
                type="primary"
                icon={<FolderAddOutlined />}
                size="large"
                onClick={() => setIsModalOpen(true)}
              >
                Новый проект
              </Button>
            </div>

            <div className="projectGrid">
              {projects.map((project) => (
                <div className="projectCard" key={project.id}>
                  <div
                    className="cardThumbnail"
                    style={{
                      backgroundColor: getColorByType(project.diagramType),
                    }}
                  >
                    {getIconByType(project.diagramType)}
                  </div>

                  <div className="cardBody">
                    <div className="cardTitle">{project.name}</div>
                    <span className="diagramTag">{project.diagramType}</span>
                    <span className="cardDate">
                      Последнее изменение:{' '}
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <Dropdown menu={getCardMenu(project.id)} trigger={['click']}>
                    <MoreOutlined
                      className="cardMenu"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Dropdown>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <CreateProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
};
