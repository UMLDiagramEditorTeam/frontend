import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './NotFoundPage.css';
import { routePaths } from '@/shared/config/routePaths';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notFoundLayout">
      <div className="notFoundCard">
        <QuestionCircleOutlined className="notFoundIcon" />

        <h1 className="notFoundTitle">404</h1>

        <h2 className="notFoundSubtitle">Страница не найдена</h2>

        <p className="notFoundDescription">
          К сожалению, такой страницы не существует. Возможно, она была удалена
          или вы ввели неверный адрес.
        </p>

        <Button
          type="primary"
          size="large"
          icon={<HomeOutlined />}
          onClick={() => navigate(routePaths.projects)}
        >
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};
