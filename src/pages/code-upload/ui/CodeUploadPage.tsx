import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Button, Checkbox, message } from 'antd';
import {
  InboxOutlined,
  FileTextOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import './CodeUploadPage.css';

const { Dragger } = Upload;

export const CodeUploadPage = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Настройка загрузчика
  const uploadProps = {
    name: 'file',
    multiple: false,
    fileList: fileList,
    beforeUpload: (file: UploadFile) => {
      // Проверка файла
      const isCode = file.name.endsWith('.py') || file.name.endsWith('.java');
      if (!isCode) {
        message.error('Вы можете загружать только файлы кода (.py, .java)');
        return Upload.LIST_IGNORE;
      }

      setFileList([file]);
      return false;
    },
    onRemove: () => {
      setFileList([]);
    },
  };

  const handleGenerate = () => {
    if (fileList.length === 0) {
      message.warning('Пожалуйста, выберите файл для загрузки');
      return;
    }
    if (selectedLanguages.length === 0) {
      message.warning('Пожалуйста, выберите язык программирования');
      return;
    }

    setLoading(true);

    // Имитация генерации (в реальности тут будет запрос к AI/Parser API)
    setTimeout(() => {
      setLoading(false);
      message.success('Диаграмма успешно сгенерирована!');
      navigate('/projects/generated-' + Date.now());
    }, 2000);
  };

  return (
    <div className="uploadPageLayout">
      <div className="uploadCard">
        <div className="uploadHeader">
          <CodeOutlined className="uploadIcon" />
          <h2>Загрузить код</h2>
          <p className="uploadDescription">
            Загрузите исходный код, чтобы автоматически сгенерировать диаграммы
            UML
          </p>
        </div>

        <Dragger {...uploadProps} className="uploadDragger">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Перетащите сюда свои файлы</p>
          <p className="ant-upload-hint">или</p>
          <Button>Выбрать файлы</Button>
        </Dragger>

        <div className="uploadOptions">
          <span className="optionsLabel">Язык программирования:</span>
          <Checkbox.Group
            value={selectedLanguages}
            onChange={(values) => setSelectedLanguages(values as string[])}
          >
            <Checkbox value="python">Python</Checkbox>
            <Checkbox value="java">Java</Checkbox>
          </Checkbox.Group>
        </div>

        <div className="uploadFooter">
          <div className="selectedFileInfo">
            {fileList.length > 0 ? (
              <>
                <FileTextOutlined
                  style={{ marginRight: 8, color: '#1890ff' }}
                />
                <span>{fileList[0].name}</span>
              </>
            ) : (
              'Файл не выбран'
            )}
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleGenerate}
            loading={loading}
            disabled={fileList.length === 0}
          >
            Сгенерировать UML
          </Button>
        </div>
      </div>
    </div>
  );
};
