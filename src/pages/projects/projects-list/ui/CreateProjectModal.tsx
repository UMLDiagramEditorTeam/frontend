import { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import './CreateProjectModal.css';

import { DIAGRAM_CONFIG, type DiagramType } from './ProjectsPage';

type Step = 'name' | 'type';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, type: DiagramType) => void;
}

export const CreateProjectModal = ({ open, onClose, onCreate }: Props) => {
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [type, setType] = useState<DiagramType | null>(null);

  const resetState = () => {
    setStep('name');
    setName('');
    setType(null);
  };

  const handleNext = () => {
    if (name.trim()) {
      setStep('type');
    }
  };

  const handleBack = () => {
    setStep('name');
  };

  const handleCreate = () => {
    if (!type) return;
    onCreate(name, type);
    resetState();
    onClose();
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Modal
      title={
        step === 'name' ? 'Создать новый проект' : 'Выберите тип диаграммы'
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      width={500}
      destroyOnClose
    >
      {step === 'name' ? (
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
            {Object.values(DIAGRAM_CONFIG).map((config) => (
              <div
                key={config.label}
                className={`typeCard ${type === config.label ? 'active' : ''}`}
                onClick={() => setType(config.label)}
              >
                <div
                  className="typeIcon"
                  style={{ backgroundColor: config.color }}
                >
                  {config.icon}
                </div>
                <h4>{config.label}</h4>
                <p>{config.description}</p>
              </div>
            ))}
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
