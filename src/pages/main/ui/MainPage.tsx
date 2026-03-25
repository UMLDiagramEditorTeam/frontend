import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import logo from '@/shared/assets/logo.png';

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <div className="card">
        <div className="logo">
          <img src={logo} alt="UML builder logo" className="mainLogo" />
        </div>

        <h1 className="title">
          Визуальный конструктор
          <br />
          UML-диаграмм
        </h1>

        <p className="description">
          Создавайте и редактируйте UML-диаграммы в несколько кликов. Управляйте
          своим кодом легко и эффективно.
        </p>

        <div className="buttonsContainer">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/login')}
          >
            Войти
          </Button>
          <Button size="large" onClick={() => navigate('/register')}>
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </div>
  );
};
