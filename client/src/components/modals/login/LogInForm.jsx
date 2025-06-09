// import React from 'react';
// import { useState } from 'react';
// import './LogInForm.css';
// import ModalButton from '../../../UI/ModalButton/ModalButton';
// import ModalInput from '../../../UI/ModalInput/ModalInput';
// import lOGO from '../../../assets/lOGO.svg';
// import RegistrationForm from '../registration/RegistrationForm';

// const LogInForm = ({ onClose }) => {
//   const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);

//   const handleRegistrationClick = () => {
//     setIsRegistrationFormOpen(true);
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="login-form-container modal">
//         <button className="close-button" onClick={onClose}>✕</button>
//         <img src={lOGO} alt="Logo" className="logo-form" />
//         <form className="login-form">
//           <ModalInput placeholder="Логин или почта" />
//           <ModalInput type="password" placeholder="Введите пароль" />
//           <ModalButton>Войти</ModalButton>
//         </form>
//         <p className="registration-link" onClick={handleRegistrationClick}>Ещё не зарегистрированы?</p>
//         {isRegistrationFormOpen && <RegistrationForm onClose={onClose} />}
//       </div>
//     </div>
//   );
// };

// export default LogInForm;

import React, { useState } from 'react';
import './LoginForm.css';
import ModalButton from '../../../UI/ModalButton/ModalButton';
import ModalInput from '../../../UI/ModalInput/ModalInput';
import lOGO from '../../../assets/lOGO.svg';
import LocalStorageService, { STORAGE_KEYS } from '../../../services/localStorageService';
import { validators } from '../../../utils/validation';
import { showSuccess, showError } from '../../../components/Notification/NotificationProvider';
import { useAuth } from '../../../context/AuthContext';

const LoginForm = ({ onClose }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Очищаем ошибку при вводе
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }

    // Валидация в реальном времени
    if (name === 'username' && value) {
      const error = validators.username(value);
      if (error) {
        setErrors(prev => ({
          ...prev,
          username: error
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Валидация перед отправкой
    const validationErrors = {};
    
    if (!formData.username) {
      validationErrors.username = 'Введите имя пользователя';
    } else if (validators.username(formData.username)) {
      validationErrors.username = validators.username(formData.username);
    }

    if (!formData.password) {
      validationErrors.password = 'Введите пароль';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError('Ошибка входа', 'Пожалуйста, проверьте правильность заполнения полей');
      return;
    }

    // Проверяем данные в localStorage
    const students = LocalStorageService.getItem(STORAGE_KEYS.REGISTERED_STUDENTS, []);
    const teacherApplications = LocalStorageService.getItem(STORAGE_KEYS.TEACHER_APPLICATIONS, []);
    
    const student = students.find(s => s.username === formData.username && s.password === formData.password);
    const teacher = teacherApplications.find(t => 
      t.username === formData.username && 
      t.password === formData.password && 
      t.status === 'approved'
    );

    if (student || teacher) {
      const userData = student || teacher;
      showSuccess('Успешный вход', 'Добро пожаловать!');
      login(userData);
      onClose();
    } else {
      showError('Ошибка входа', 'Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="login-form-container modal">
        <button className="close-button" onClick={onClose}>✕</button>
        <img src={lOGO} alt="Logo" className="logo-form" />
        
        <h1 className="form-title">Вход в систему</h1>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <ModalInput
            type="text"
            name="username"
            placeholder="Имя пользователя"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          
          <ModalInput
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          
          <ModalButton type="submit">
            Войти
          </ModalButton>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

