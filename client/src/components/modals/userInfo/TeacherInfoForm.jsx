import React, { useState, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import ModalButton from '../../../UI/ModalButton/ModalButton';
import ModalInput from '../../../UI/ModalInput/ModalInput';
import LocalStorageService, { STORAGE_KEYS } from '../../../services/localStorageService';
import { showSuccess } from '../../../components/Notification/NotificationProvider';

const TeacherInfoForm = ({ onClose, onRegister, formData: registrationData }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    department: '',
    position: '',
    academicDegree: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBack = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Создаем объект с данными преподавателя
      const teacherData = {
        ...registrationData,
        ...formData,
        id: Date.now(),
        role: 'teacher',
        status: 'pending',
        dateSubmitted: new Date().toISOString()
      };

      // Сохраняем заявку преподавателя
      const existingApplications = LocalStorageService.getItem(STORAGE_KEYS.TEACHER_APPLICATIONS, []);
      LocalStorageService.setItem(STORAGE_KEYS.TEACHER_APPLICATIONS, [...existingApplications, teacherData]);

      // Показываем уведомление об успехе
      setShowNotification(true);
      showSuccess(
        'Заявка отправлена',
        'Ваша заявка успешно отправлена. Ожидайте ответа от администратора.',
        { duration: 5 }
      );

      // Закрываем форму через 2 секунды
      setTimeout(() => {
        onRegister();
      }, 2000);

    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <style>
        {`
          .user-info-form-container {
            width: 578px;
            height: 843px;
            background-color: var(--modal-bg-color);
            border-radius: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
          }

          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.35);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
          }

          .form-title {
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 48px;
            line-height: 150%;
            color: var(--modal-header-color);
            margin-top: 86px;
          }

          .user-info-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 46px;
          }

          .user-info-form > :nth-child(2),
          .user-info-form > :nth-child(1) {
            margin-bottom: 44px;
          }

          .user-info-form > :nth-child(3) {
            margin-bottom: 50px;
          }

          .button-group-uinfo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 42px;
          }

          .notification-message {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            margin: 20px 0;
            text-align: center;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
            animation: fadeIn 0.3s ease-in-out;
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translate(-50%, -10px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }
        `}
      </style>

      <div className="modal-backdrop">
        <div className="user-info-form-container modal">
          {showNotification && (
            <div className="notification-message">
              Заявка успешно отправлена!
            </div>
          )}
          
          <h1 className="form-title">Расскажите о себе</h1>
          <form className="user-info-form" onSubmit={handleRegister}>
            <ModalInput
              type="text"
              name="fullName"
              placeholder="Ваше ФИО"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <ModalInput
              type="text"
              name="department"
              placeholder="Кафедра"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <ModalInput
              type="text"
              name="position"
              placeholder="Должность"
              value={formData.position}
              onChange={handleChange}
              required
            />
            <ModalInput
              type="text"
              name="academicDegree"
              placeholder="Учёная степень"
              value={formData.academicDegree}
              onChange={handleChange}
            />
            <div className="button-group-uinfo">
              <ModalButton type="button" onClick={handleBack}>Назад</ModalButton>
              <ModalButton type="submit">Отправить заявку</ModalButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TeacherInfoForm; 