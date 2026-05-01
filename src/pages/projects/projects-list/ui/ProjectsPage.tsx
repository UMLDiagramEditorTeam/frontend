import React, { useState, useEffect, useMemo } from 'react';
import { Button, Dropdown, Spin, message, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  FolderAddOutlined,
  SearchOutlined,
  FilterOutlined,
  CloseOutlined,
  UserOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import './ProjectsPage.css';
import { CreateProjectModal } from './CreateProjectModal';
import { routePaths } from '@/shared/config/routePaths.ts';

interface Project {
  id: string | number;
  name: string;
  diagramType: string;
  updatedAt: string;
}

export const ProjectsPage = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenEditor = (projectId: string | number) => {
    navigate(`/projects/${projectId}`);
  };

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

  const handleDelete = (id: string | number) => {
    setProjects(projects.filter((p) => p.id !== id));
    message.success('Проект удален');
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter
        ? project.diagramType === activeFilter
        : true;
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchQuery, activeFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchVisible(false);
  };

  const filterMenuItems = [
    {
      key: 'all',
      label: 'Все типы',
      onClick: () => setActiveFilter(null),
    },
    {
      key: 'class',
      label: 'Class Diagram',
      onClick: () => setActiveFilter('Class Diagram'),
    },
    {
      key: 'sequence',
      label: 'Sequence Diagram',
      onClick: () => setActiveFilter('Sequence Diagram'),
    },
  ];

  const getCardMenu = (projectId: string | number) => ({
    items: [
      { key: 'edit', label: 'Редактировать', icon: <EditOutlined /> },
      {
        key: 'delete',
        label: 'Удалить',
        icon: <DeleteOutlined />,
        danger: true,
      },
    ],
    onClick: (info: { key: string }) => {
      if (info.key === 'delete') handleDelete(projectId);
      else if (info.key === 'edit') handleOpenEditor(projectId);
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

  const getProjectsWord = (count: number): string => {
    const lastTwo = Math.abs(count) % 100;
    const lastOne = lastTwo % 10;
    if (lastTwo > 10 && lastTwo < 20) return 'проектов';
    if (lastOne > 1 && lastOne < 5) return 'проекта';
    if (lastOne === 1) return 'проект';
    return 'проектов';
  };

  return (
    <div className="projectsLayout">
      <header className="header">
        <div className="headerLogo">
          <img src="/logo.png" alt="headerLogo" className="headerLogoImg" />
          UML Building
        </div>

        <div className="headerActions">
          {/* --- Поиск --- */}
          {isSearchVisible ? (
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={() => {
                if (!searchQuery) setIsSearchVisible(false);
              }} // Скрывать, если пусто
              autoFocus
              className="headerSearchInput"
              suffix={
                searchQuery ? (
                  <CloseOutlined
                    onClick={clearSearch}
                    style={{ cursor: 'pointer' }}
                  />
                ) : null
              }
            />
          ) : (
            <SearchOutlined
              className="headerIcon"
              onClick={() => setIsSearchVisible(true)}
            />
          )}

          <Dropdown menu={{ items: filterMenuItems }} trigger={['click']}>
            <FilterOutlined
              className={`headerIcon ${activeFilter ? 'activeFilter' : ''}`}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>

          <div
            className="avatar"
            onClick={() => navigate(routePaths.profile)}
            style={{ cursor: 'pointer' }}
          >
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

        {!loading && filteredProjects.length === 0 && projects.length > 0 && (
          <div className="emptyState">
            <SearchOutlined className="emptyIcon" />
            <h2 className="emptyTitle">Ничего не найдено</h2>
            <p className="emptyDescription">
              Попробуйте изменить параметры поиска или фильтры.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter(null);
              }}
            >
              Сбросить фильтры
            </Button>
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

        {!loading && filteredProjects.length > 0 && (
          <>
            <div className="listHeader">
              <h2 className="projectsCount">
                {filteredProjects.length}{' '}
                {getProjectsWord(filteredProjects.length)}
                {activeFilter && (
                  <span
                    style={{ fontSize: 14, color: '#8c8c8c', marginLeft: 8 }}
                  >
                    Тип: {activeFilter}
                  </span>
                )}
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
              {filteredProjects.map((project) => (
                <div
                  className="projectCard"
                  key={project.id}
                  onClick={() => handleOpenEditor(project.id)}
                >
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
