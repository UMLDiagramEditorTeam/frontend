import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Radio, List, message, Divider } from 'antd';
import {
  CodeOutlined,
  FileTextOutlined,
  DownloadOutlined,
  SettingOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import './CodeGenerationPage.css';

export const CodeGenerationPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('java');
  const [loading, setLoading] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<
    { name: string; icon: React.ReactNode }[]
  >([]);

  // Настройки генерации
  const [settings, setSettings] = useState({
    comments: true,
    gettersSetters: true,
    privateFields: true,
  });

  // Моки файлов для примера
  const mockFiles = [
    {
      name: 'Product.java',
      icon: <FileTextOutlined style={{ color: '#f56a00' }} />,
    },
    {
      name: 'Customer.java',
      icon: <FileTextOutlined style={{ color: '#f56a00' }} />,
    },
    {
      name: 'Order.java',
      icon: <FileTextOutlined style={{ color: '#f56a00' }} />,
    },
  ];

  const handleGenerate = () => {
    setLoading(true);
    setGeneratedFiles([]); // Очищаем предыдущие

    // Имитация запроса к AI / Backend
    setTimeout(() => {
      setLoading(false);
      setGeneratedFiles(mockFiles);
      message.success('Код успешно сгенерирован!');
    }, 2000);
  };

  const handleDownload = (fileName: string) => {
    message.info(`Скачивание файла ${fileName}...`);
    // Здесь будет логика реального скачивания файла
  };

  return (
    <div className="genPageLayout">
      <div className="genCard">
        <div className="genHeader">
          <CodeOutlined className="genIcon" />
          <h2>Генерация кода</h2>
          <p>Настройте параметры и сгенерируйте исходный код из диаграммы</p>
        </div>

        <div className="genBody">
          {/* Выбор языка */}
          <div className="genSection">
            <label className="sectionLabel">Язык программирования</label>
            <Radio.Group
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="languageGroup"
            >
              <Radio.Button value="java">Java</Radio.Button>
              <Radio.Button value="python">Python</Radio.Button>
            </Radio.Group>
          </div>

          {/* Настройки */}
          <div className="genSection">
            <label className="sectionLabel">
              <SettingOutlined /> Настройки
            </label>
            <div className="settingsBox">
              <Checkbox
                checked={settings.comments}
                onChange={(e) =>
                  setSettings({ ...settings, comments: e.target.checked })
                }
              >
                Включить комментарии
              </Checkbox>
              <Checkbox
                checked={settings.gettersSetters}
                onChange={(e) =>
                  setSettings({ ...settings, gettersSetters: e.target.checked })
                }
              >
                Генерировать геттеры/сеттеры
              </Checkbox>
              <Checkbox
                checked={settings.privateFields}
                onChange={(e) =>
                  setSettings({ ...settings, privateFields: e.target.checked })
                }
              >
                Приватные поля
              </Checkbox>
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            block
            onClick={handleGenerate}
            loading={loading}
            icon={<CodeOutlined />}
          >
            Сгенерировать код
          </Button>

          {/* Результат */}
          {generatedFiles.length > 0 && (
            <div className="genResult">
              <Divider />
              <div className="resultHeader">
                <CheckCircleOutlined
                  style={{ color: '#52c41a', marginRight: 8 }}
                />
                Код успешно сгенерирован!
              </div>

              <List
                className="fileList"
                itemLayout="horizontal"
                dataSource={generatedFiles}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(item.name)}
                      >
                        Скачать
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={item.icon}
                      title={item.name}
                      description="Готов к использованию"
                    />
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>

        <div className="genFooter">
          <Button onClick={() => navigate(-1)}>Закрыть</Button>
        </div>
      </div>
    </div>
  );
};
