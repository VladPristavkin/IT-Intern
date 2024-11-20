// import React from 'react';
// import './UserInfoForm.css';
// import ModalButton from '../../../UI/ModalButton/ModalButton';
// import ModalInput from '../../../UI/ModalInput/ModalInput';

// const UserInfoForm = ({ onClose, onRegister, formData, setFormData }) => {

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleBack = (e) => {
//     e.preventDefault();
//     onClose();
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     console.log('User registered:', formData);
//     onRegister();
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="user-info-form-container modal">
//         <h1 className="form-title">Расскажите о себе</h1>
//         <form className="user-info-form">
//           <ModalInput
//             type="text"
//             name="name"
//             placeholder="Ваше ФИО"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <ModalInput
//             type="email"
//             name="email"
//             placeholder="Ваша специальность (ПИР, АСОИР)"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <ModalInput
//             type="tel"
//             name="phone"
//             placeholder="В каком году Вы поступили?"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <div className="button-group-uinfo">
//             <ModalButton type="button" onClick={handleBack}>Назад</ModalButton>
//             <ModalButton type="button" onClick={handleRegister}>Зарегистрироваться</ModalButton>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserInfoForm;


// import React, { useState, useContext } from 'react';
// import './UserInfoForm.css';
// import ModalButton from '../../../UI/ModalButton/ModalButton';
// import ModalInput from '../../../UI/ModalInput/ModalInput';
// import AuthContext from '../../../context/AuthContext';

// const UserInfoForm = ({ onClose, onRegister }) => {
//   const { login } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleBack = (e) => {
//     e.preventDefault();
//     onClose(); // Закрываем только текущее модальное окно
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData), // Отправляем данные на сервер для регистрации
//       });

//       if (response.ok) {
//         const data = await response.json();
//         login(data.token); // Логиним пользователя, используя токен, полученный от сервера
//         onRegister(); // Вызываем функцию для закрытия модального окна или выполнения других действий
//       } else {
//         console.error('Registration failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="user-info-form-container modal">
//         <h1 className="form-title">Расскажите о себе</h1>
//         <form className="user-info-form" onSubmit={handleRegister}>
//           <ModalInput
//             type="text"
//             name="name"
//             placeholder="Ваше ФИО"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <ModalInput
//             type="email"
//             name="email"
//             placeholder="Ваша специальность (ПИР, АСОИР)"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <ModalInput
//             type="tel"
//             name="phone"
//             placeholder="В каком году Вы поступили?"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <div className="button-group-uinfo">
//             <ModalButton type="button" onClick={handleBack}>Назад</ModalButton>
//             <ModalButton type="submit">Зарегистрироваться</ModalButton>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserInfoForm;


import React, { useState, useContext } from 'react';
import './UserInfoForm.css';
import ModalButton from '../../../UI/ModalButton/ModalButton';
import ModalInput from '../../../UI/ModalInput/ModalInput';
import AuthContext from '../../../context/AuthContext';

const UserInfoForm = ({ onClose, onRegister }) => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBack = (e) => {
    e.preventDefault();
    console.log('Кнопка "Назад" нажата');
    onClose(); // Закрываем только текущее модальное окно
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Отправляем данные на сервер для регистрации
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token); // Логиним пользователя, используя токен, полученный от сервера
        onRegister(); // Вызываем функцию для закрытия модального окна или выполнения других действий
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="user-info-form-container modal">
        <h1 className="form-title">Расскажите о себе</h1>
        <form className="user-info-form" onSubmit={handleRegister}>
          <ModalInput
            type="text"
            name="name"
            placeholder="Ваше ФИО"
            value={formData.name}
            onChange={handleChange}
          />
          <ModalInput
            type="email"
            name="email"
            placeholder="Ваша специальность (ПИР, АСОИР)"
            value={formData.email}
            onChange={handleChange}
          />
          <ModalInput
            type="tel"
            name="phone"
            placeholder="В каком году Вы поступили?"
            value={formData.phone}
            onChange={handleChange}
          />
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

