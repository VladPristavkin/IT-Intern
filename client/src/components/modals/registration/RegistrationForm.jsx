import React, { useState } from 'react';
import './RegistrationForm.css';
import ModalButton from '../../../UI/ModalButton/ModalButton';
import ModalInput from '../../../UI/ModalInput/ModalInput';
import UserInfoForm from '../userInfo/UserInfoForm';
import TeacherInfoForm from '../userInfo/TeacherInfoForm';
import lOGO from '../../../assets/lOGO.svg';
import LocalStorageService, { STORAGE_KEYS } from '../../../services/localStorageService';
import { validators, validateForm } from '../../../utils/validation';
import { showSuccess, showError } from '../../../components/Notification/NotificationProvider';

const RegistrationForm = ({ onClose }) => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validationRules = {
    email: [validators.required, validators.email],
    username: [validators.required, validators.username],
    password: [validators.required, validators.password],
    confirmPassword: [
      validators.required,
      (value) => validators.passwordMatch(value, formData.password)
    ]
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!userType) {
      showError('Ошибка', 'Пожалуйста, выберите тип пользователя');
      return;
    }

    const { isValid, errors: validationErrors } = validateForm(formData, validationRules);
    
    if (!isValid) {
      setErrors(validationErrors);
      showError('Ошибка валидации', 'Пожалуйста, проверьте правильность заполнения полей');
      return;
    }

    setIsUserInfoOpen(true);
  };

  const handleCloseUserInfo = () => {
    setIsUserInfoOpen(false);
  };

  const handleCloseModals = () => {
    setIsUserInfoOpen(false);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    
    // Очищаем ошибку поля при изменении
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  return (
    <div className="modal-backdrop">
      <div className="registration-form-container modal">
        <button className="close-button" onClick={onClose}>✕</button>
        <img src={lOGO} alt="Logo" className="logo-form" />

        <form className="registration-form">
          <ModalInput 
            type="email"
            name="email"
            placeholder="Введите почту"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <ModalInput 
            type="text"
            name="username"
            placeholder="Придумайте никнейм для входа"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <ModalInput 
            type="password"
            name="password"
            placeholder="Придумайте пароль"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <ModalInput 
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          
          <div className="user-type-selector">
            <div className="user-type-label">Я регистрируюсь как:</div>
            <div className="user-type-buttons">
              <button
                type="button"
                className={`user-type-btn ${userType === 'student' ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('student')}
              >
                Студент
              </button>
              <button
                type="button"
                className={`user-type-btn ${userType === 'teacher' ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('teacher')}
              >
                Преподаватель
              </button>
            </div>
          </div>
          
          <ModalButton onClick={handleContinue}>
            Продолжить
          </ModalButton>
        </form>
        
        {isUserInfoOpen && userType === 'student' && (
          <UserInfoForm
            onClose={handleCloseUserInfo}
            onRegister={handleCloseModals}
            formData={formData}
          />
        )}

        {isUserInfoOpen && userType === 'teacher' && (
          <TeacherInfoForm
            onClose={handleCloseUserInfo}
            onRegister={handleCloseModals}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default RegistrationForm; 