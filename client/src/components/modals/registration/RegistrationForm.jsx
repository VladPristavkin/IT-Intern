import React, { useState } from 'react';
import './RegistrationForm.css';
import ModalButton from '../../../UI/ModalButton/ModalButton';
import ModalInput from '../../../UI/ModalInput/ModalInput';
import UserInfoForm from '../userInfo/UserInfoForm';
import lOGO from '../../../assets/lOGO.svg';

const RegistrationForm = ({ onClose }) => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleContinue = (e) => {
    e.preventDefault();
    setIsUserInfoOpen(true);
    console.log("Сработало продолжить");
  };

  const handleCloseUserInfo = () => {
    console.log("Закрытие формы UserInfo");
    setIsUserInfoOpen(false);
  };

  const handleCloseModals = () => {
    console.log("Закрытие всех форм");
    setIsUserInfoOpen(false);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
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
          />
          <ModalInput 
            type="text" 
            name="username"
            placeholder="Придумайте никнейм для входа" 
            value={formData.username}
            onChange={handleChange}
          />
          <ModalInput 
            type="password" 
            name="password"
            placeholder="Придумайте пароль" 
            value={formData.password}
            onChange={handleChange}
          />
          <ModalInput 
            type="password" 
            name="confirmPassword"
            placeholder="Подтвердите пароль" 
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <ModalButton onClick={handleContinue}>Продолжить</ModalButton>
        </form>
        {isUserInfoOpen && 
          <UserInfoForm 
            onClose={handleCloseUserInfo} 
            onRegister={handleCloseModals} 
            formData={formData} 
            setFormData={setFormData}
          />}
      </div>
    </div>
  );
};

export default RegistrationForm;



