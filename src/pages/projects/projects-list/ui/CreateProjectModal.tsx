import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { AppstoreOutlined, ApartmentOutlined } from '@ant-design/icons';
import './CreateProjectModal.css';

interface ProjectData {
  name: string;
  type: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, type: string) => void;
  onUpdate?: (name: string, type: string) => void;
  initialData?: ProjectData;
}

export const CreateProjectModal: React.FC<Props> = ({
  open,
  onClose,
  onCreate,
  onUpdate,
  initialData,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initialData?.name || '');
  const [type, setType] = useState(initialData?.type || '');

  const isEditMode = !!initialData;

  const handleNext = () => {
    if (name.trim()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    if (!type) return;

    if (isEditMode && onUpdate) {
      onUpdate(name, type);
    } else {
      onCreate(name, type);
    }
    handleClose();
  };

  const handleQuickSave = () => {
    if (name.trim() && type && onUpdate) {
      onUpdate(name, type);
      handleClose();
    }
  };

  const handleClose = () => {
    setStep(1);
    setName('');
    setType('');
    onClose();
  };

  return (
    <Modal
      title={
        isEditMode
          ? 'Редактировать проект'
          : step === 1
            ? 'Создать новый проект'
            : 'Выберите тип диаграммы'
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      width={500}
      destroyOnClose
    >
      {step === 1 ? (
        <div className="modalStep">
          <p className="modalLabel">
            Название проекта <span className="required">*</span>
          </p>
          <Input
            placeholder="Введите название проекта"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="large"
          />
          <p className="modalHint">Обязательное поле</p>

          <div className="modalActions">
            <Button onClick={handleClose}>Отменить</Button>

            {isEditMode ? (
              <Button
                type="primary"
                onClick={handleQuickSave}
                disabled={!name.trim()}
              >
                Сохранить
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={handleNext}
                disabled={!name.trim()}
              >
                Далее
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="modalStep">
          <div className="typeGrid">
            <div
              className={`typeCard ${type === 'Class Diagram' ? 'active' : ''}`}
              onClick={() => setType('Class Diagram')}
            >
              <div className="typeIcon" style={{ backgroundColor: '#1890ff' }}>
                <AppstoreOutlined />
              </div>
              <h4>Class Diagram</h4>
              <p>Structure & relationships</p>
            </div>
            <div
              className={`typeCard ${type === 'Sequence Diagram' ? 'active' : ''}`}
              onClick={() => setType('Sequence Diagram')}
            >
              <div className="typeIcon" style={{ backgroundColor: '#52c41a' }}>
                <ApartmentOutlined />
              </div>
              <h4>Sequence Diagram</h4>
              <p>Interactions over time</p>
            </div>
          </div>

          <div className="modalActions">
            <Button onClick={handleBack}>Назад</Button>
            <Button type="primary" onClick={handleSubmit} disabled={!type}>
              {isEditMode ? 'Сохранить' : 'Создать проект'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
