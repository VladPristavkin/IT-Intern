import React from 'react';
import { notification } from 'antd';
import { CheckCircleOutlined, WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';

// Типы уведомлений
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

// Конфигурация иконок для разных типов уведомлений
const ICONS = {
  [NOTIFICATION_TYPES.SUCCESS]: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  [NOTIFICATION_TYPES.ERROR]: <WarningOutlined style={{ color: '#ff4d4f' }} />,
  [NOTIFICATION_TYPES.INFO]: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
  [NOTIFICATION_TYPES.WARNING]: <WarningOutlined style={{ color: '#faad14' }} />
};

// Конфигурация по умолчанию
const defaultConfig = {
  placement: 'topRight',
  duration: 3,
};

/**
 * Показать уведомление
 * @param {string} type - Тип уведомления (success, error, info, warning)
 * @param {string} message - Заголовок уведомления
 * @param {string} description - Описание уведомления
 * @param {Object} customConfig - Дополнительные настройки
 */
export const showNotification = (type, message, description = '', customConfig = {}) => {
  notification[type]({
    message,
    description,
    icon: ICONS[type],
    ...defaultConfig,
    ...customConfig,
  });
};

// Хелперы для разных типов уведомлений
export const showSuccess = (message, description, config) => 
  showNotification(NOTIFICATION_TYPES.SUCCESS, message, description, config);

export const showError = (message, description, config) => 
  showNotification(NOTIFICATION_TYPES.ERROR, message, description, config);

export const showInfo = (message, description, config) => 
  showNotification(NOTIFICATION_TYPES.INFO, message, description, config);

export const showWarning = (message, description, config) => 
  showNotification(NOTIFICATION_TYPES.WARNING, message, description, config); 