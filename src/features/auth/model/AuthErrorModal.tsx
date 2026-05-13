import { useState } from 'react';
import { Modal, Button, Typography, Space } from 'antd';
import { ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import type { AuthErrorState } from './useAuthError';

const { Text } = Typography;

interface AuthErrorModalProps {
  errorState: AuthErrorState | null;
  onClose: () => void;
}

export const AuthErrorModal = ({
  errorState,
  onClose,
}: AuthErrorModalProps) => {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    if (!errorState?.retry) return;
    setRetrying(true);
    try {
      await errorState.retry();
      onClose(); // !если retry прошёл успешно то модалка закрывается
    } catch {
      // ошибка остается в errorState через handleError в родителе
    } finally {
      setRetrying(false);
    }
  };

  return (
    <Modal
      open={!!errorState}
      onCancel={onClose}
      title={
        <Space>
          <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
          <span>Произошла ошибка</span>
        </Space>
      }
      footer={[
        <Button key="cancel" onClick={onClose}>
          Закрыть
        </Button>,
        <Button
          key="retry"
          type="primary"
          icon={<ReloadOutlined />}
          loading={retrying}
          onClick={handleRetry}
        >
          Повторить
        </Button>,
      ]}
      centered
      maskClosable={false}
    >
      <Text type="danger">{errorState?.message}</Text>
    </Modal>
  );
};
