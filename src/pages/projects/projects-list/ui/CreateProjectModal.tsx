import { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import './CreateProjectModal.css';

import { DIAGRAM_CONFIG, type DiagramType } from './ProjectsPage';

type Step = 'name' | 'type';

interface ProjectData {
  name: string;
  type: DiagramType;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, type: DiagramType) => void;
  onUpdate?: (name: string, type: DiagramType) => void;
  initialData?: ProjectData;
}

export const CreateProjectModal = ({
  open,
  onClose,
  onCreate,
  onUpdate,
  initialData,
}: Props) => {
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState(initialData?.name ?? '');
  const [type, setType] = useState<DiagramType | null>(
    initialData?.type ?? null,
  );

  const isEditMode = !!initialData;

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

  const handleClose = () => {
    resetState();
    onClose();
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

  return (
    <Modal
      title={
        isEditMode
          ? 'Редактировать проект'
          : step === 'name'
            ? 'Создать новый проект'
            : 'Выберите тип диаграммы'
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
            <Button type="primary" onClick={handleSubmit} disabled={!type}>
              {isEditMode ? 'Сохранить' : 'Создать проект'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
