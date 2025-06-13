import React, { useState, useContext } from 'react';
import './LogInForm.css';
import ModalButton from '../../../UI/ModalButton/ModalButton';
import ModalInput from '../../../UI/ModalInput/ModalInput';
import lOGO from '../../../assets/lOGO.svg';
import AuthContext from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import db from '../../../utils/localDb';

const LogInForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    general: ''
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateUsername = (username) => {
    if (!username) return 'Введите логин';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Введите пароль';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Очищаем ошибки при вводе
    setErrors(prevState => ({
      ...prevState,
      [name]: '',
      general: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
      general: ''
    };

    // Если есть ошибки валидации полей
    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    const users = db.getAll('users');
    console.log(users);
    const user = users.find(u => u.username === formData.username);
    console.log(user);

    if (!user) {
      setErrors({
        ...newErrors,
        username: 'Пользователь не найден'
      });
      return;
    }

    if (user.password !== formData.password) {
      setErrors({
        ...newErrors,
        password: 'Неверный пароль'
      });
      return;
    }

    switch (user.role) {
      case 'student':
        login(user.userId);
        navigate("/student");
        break;
      case 'teacher':
        login(user.userId);
        navigate("/teacher");
        break;
        case 'admin':
        login(user.userId);
        navigate("/teacher");
    }
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="login-form-container modal">
        <button className="close-button" onClick={onClose}>✕</button>
        <img src={lOGO} alt="Logo" className="logo-form" />
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <ModalInput
              type="text"
              name="username"
              placeholder="Логин"
              value={formData.username}
              onChange={handleChange}
              className={errors.username || errors.general ? 'error' : ''}
            />
            {errors.username && <span className="login-error-message">{errors.username}</span>}
          </div>

          <div className="input-group">
            <ModalInput
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={formData.password}
              onChange={handleChange}
              className={errors.password || errors.general ? 'error' : ''}
            />
            {errors.password && <span className="login-error-message">{errors.password}</span>}
          </div>

          {errors.general && <span className="login-error-message general">{errors.general}</span>}

          <ModalButton type="submit">Войти</ModalButton>
        </form>
      </div>
    </div>
  );
};

export default LogInForm;
