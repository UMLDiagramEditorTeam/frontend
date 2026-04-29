import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { AppstoreOutlined, ApartmentOutlined } from '@ant-design/icons';
import './CreateProjectModal.css';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, type: string) => void;
}

export const CreateProjectModal: React.FC<Props> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleNext = () => {
    if (name.trim()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCreate = () => {
    if (type) {
      onCreate(name, type);
      // Сбрасываем состояние
      setStep(1);
      setName('');
      setType('');
      onClose();
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
      title={step === 1 ? 'Создать новый проект' : 'Выберите тип диаграммы'}
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
            <Button type="primary" onClick={handleNext} disabled={!name.trim()}>
              Далее
            </Button>
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
            <Button type="primary" onClick={handleCreate} disabled={!type}>
              Создать проект
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
