import React, { useState } from 'react';
import './RegistrationForm.css';
import ModalButton from '../../../UI/ModalButton/ModalButton';
import ModalInput from '../../../UI/ModalInput/ModalInput';
import UserInfoForm from '../userInfo/UserInfoForm';
import lOGO from '../../../assets/lOGO.svg';
import db from '../../../utils/localDb';

const RegistrationForm = ({ onClose }) => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email) => {
    if (!email) return 'Email обязателен для заполнения';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Введите корректный email';
    
    // Проверяем, существует ли пользователь с таким email
    const users = db.getAll('users');
    const existingUser = users.find(user => user.email === email);
    if (existingUser) return 'Пользователь с таким email уже существует';
    
    return '';
  };

  const validateUsername = (username) => {
    if (!username) return 'Никнейм обязателен для заполнения';
    if (username.length < 3) return 'Никнейм должен быть не менее 3 символов';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Никнейм может содержать только буквы, цифры и подчеркивания';

    // Проверяем, существует ли пользователь с таким username
    const users = db.getAll('users');
    const existingUser = users.find(user => user.username === username);
    if (existingUser) return 'Пользователь с таким никнеймом уже существует';

    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Пароль обязателен для заполнения';
    if (password.length < 6) return 'Пароль должен быть не менее 6 символов';
    if (!/[A-Z]/.test(password)) return 'Пароль должен содержать хотя бы одну заглавную букву';
    if (!/[0-9]/.test(password)) return 'Пароль должен содержать хотя бы одну цифру';
    return '';
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) return 'Подтвердите пароль';
    if (confirmPassword !== formData.password) return 'Пароли не совпадают';
    return '';
  };

  const handleContinue = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(formData.email),
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword)
    };

    setErrors(newErrors);

    // Если нет ошибок, продолжаем
    if (!Object.values(newErrors).some(error => error !== '')) {
      setIsUserInfoOpen(true);
    }
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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Очищаем ошибку при изменении поля
    setErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));
  };

  return (
    <div className="modal-backdrop">
      <div className="registration-form-container modal">
        <button className="close-button" onClick={onClose}>✕</button>
        <img src={lOGO} alt="Logo" className="logo-form" />
        <form className="registration-form">
          <div className="input-group">
            <ModalInput 
              type="email" 
              name="email"
              placeholder="Введите почту" 
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="registration-error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <ModalInput 
              type="text" 
              name="username"
              placeholder="Придумайте никнейм для входа" 
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="registration-error-message">{errors.username}</span>}
          </div>

          <div className="input-group">
            <ModalInput 
              type="password" 
              name="password"
              placeholder="Придумайте пароль" 
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="registration-error-message">{errors.password}</span>}
          </div>

          <div className="input-group">
            <ModalInput 
              type="password" 
              name="confirmPassword"
              placeholder="Подтвердите пароль" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="registration-error-message">{errors.confirmPassword}</span>}
          </div>

          <ModalButton onClick={handleContinue}>Продолжить</ModalButton>
        </form>
        {isUserInfoOpen && 
          <UserInfoForm 
            onClose={handleCloseUserInfo} 
            onRegister={handleCloseModals}
            registrationData={formData}
          />
        }
      </div>
    </div>
  );
};

export default RegistrationForm;



