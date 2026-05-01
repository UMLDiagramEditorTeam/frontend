import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import {
  FileImageOutlined,
  FilePdfOutlined,
  CodeOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import './ExportPage.css';

export const ExportPage = () => {
  const navigate = useNavigate();
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [loading, setLoading] = useState(false);

  const formats = [
    {
      id: 'png',
      label: 'PNG',
      icon: <FileImageOutlined />,
      desc: 'Растровое изображение',
    },
    {
      id: 'pdf',
      label: 'PDF',
      icon: <FilePdfOutlined />,
      desc: 'Документ для печати',
    },
    {
      id: 'svg',
      label: 'SVG',
      icon: <CodeOutlined />,
      desc: 'Векторная графика',
    },
  ];

  const handleExport = () => {
    setLoading(true);

    // Имитация процесса экспорта
    setTimeout(() => {
      setLoading(false);
      message.success(
        `Диаграмма успешно экспортирована в ${selectedFormat.toUpperCase()}`,
      );
      navigate(-1);
    }, 1500);
  };

  return (
    <div className="exportPageLayout">
      <div className="exportCard">
        <div className="exportHeader">
          <h2>Экспорт диаграммы</h2>
          <p>Выберите формат и сохраните результат</p>
        </div>

        <div className="exportFormats">
          {formats.map((format) => (
            <div
              key={format.id}
              className={`formatCard ${selectedFormat === format.id ? 'active' : ''}`}
              onClick={() => setSelectedFormat(format.id)}
            >
              <div className="formatIcon">{format.icon}</div>
              <div className="formatInfo">
                <span className="formatLabel">{format.label}</span>
                <span className="formatDesc">{format.desc}</span>
              </div>
              {selectedFormat === format.id && (
                <CheckCircleFilled className="formatCheck" />
              )}
            </div>
          ))}
        </div>

        <div className="exportPreview">
          <div className="previewLabel">Предварительный просмотр</div>
          <div className="previewBox">
            <div className="previewDummyNode">
              <div className="previewDummyHeader">Product</div>
              <div className="previewDummyContent">
                <div>id: int</div>
                <div>name: string</div>
              </div>
            </div>
          </div>
        </div>

        <div className="exportFooter">
          <Button size="large" onClick={() => navigate(-1)}>
            Отмена
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleExport}
            loading={loading}
          >
            Экспорт
          </Button>
        </div>
      </div>
    </div>
  );
};
