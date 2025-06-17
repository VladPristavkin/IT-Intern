import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfoForm.css';
import ModalButton from '../../../UI/ModalButton/ModalButton';
import ModalInput from '../../../UI/ModalInput/ModalInput';
import db from '../../../utils/localDb';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from '../../../context/AuthContext';

const UserInfoForm = ({ onClose, onRegister, registrationData }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speciality: '',
    year: '',
    role: 'student'
  });

  const [errors, setErrors] = useState({
    name: '',
    speciality: '',
    year: ''
  });

  const validateName = (name) => {
    if (!name) return 'ФИО обязательно для заполнения';
    if (!/^[А-ЯЁа-яё\s-]+$/.test(name)) return 'ФИО может содержать только русские буквы, пробелы и дефис';
    const words = name.trim().split(/\s+/);
    if (words.length < 2) return 'Введите полное ФИО (минимум имя и фамилия)';
    return '';
  };

  const validateSpeciality = (speciality) => {
    if (!speciality) return 'Специальность обязательна для заполнения';
    if (!['ПИР', 'АСОИР'].includes(speciality.toUpperCase())) {
      return 'Специальность должна быть ПИР или АСОИР';
    }
    return '';
  };

  const validateYear = (year) => {
    if (!year) return 'Год поступления обязателен для заполнения';
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();
    if (yearNum < 2015 || yearNum > currentYear) {
      return `Год должен быть между 2015 и ${currentYear}`;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Очищаем ошибку при изменении поля
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleBack = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(formData.name),
      speciality: validateSpeciality(formData.speciality),
      year: validateYear(formData.year)
    };

    setErrors(newErrors);

    // Если есть ошибки, прерываем
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    const yearShort = formData.year % 100;   // последние две цифры
    const groupNumber = `${yearShort}1`; // добавляем "1" в конец

    const userId = uuidv4();
    const newUser = {
      userId,
      ...registrationData,
      ...formData,
      speciality: formData.speciality.toUpperCase() + '-' + groupNumber
    };

    const savedUser = db.insert('users', newUser);
    login(savedUser.userId);
    onRegister();
    navigate('/student'); // Перенаправляем на страницу студента
  };

  return (
    <div className="modal-backdrop">
      <div className="user-info-form-container modal">
        <h1 className="form-title">Расскажите о себе</h1>
        <form className="user-info-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <ModalInput
              type="text"
              name="name"
              placeholder="Ваше ФИО"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="user-info-error-message">{errors.name}</span>}
          </div>

          <div className="input-group">
            <ModalInput
              type="text"
              name="speciality"
              placeholder="Ваша специальность (ПИР, АСОИР)"
              value={formData.speciality}
              onChange={handleChange}
              className={errors.speciality ? 'error' : ''}
            />
            {errors.speciality && <span className="user-info-error-message">{errors.speciality}</span>}
          </div>

          <div className="input-group">
            <ModalInput
              type="number"
              name="year"
              placeholder="В каком году Вы поступили?"
              value={formData.year}
              onChange={handleChange}
              className={errors.year ? 'error' : ''}
              min="2015"
              max={new Date().getFullYear()}
            />
            {errors.year && <span className="user-info-error-message">{errors.year}</span>}
          </div>

          <div className="button-group-uinfo">
            <ModalButton type="button" onClick={handleBack}>Назад</ModalButton>
            <ModalButton type="submit">Зарегистрироваться</ModalButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;

