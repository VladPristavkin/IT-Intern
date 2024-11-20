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

import React, { useState, useContext } from 'react';
import './LogInForm.css';
import ModalButton from '../../../UI/ModalButton/ModalButton';
import ModalInput from '../../../UI/ModalInput/ModalInput';
import lOGO from '../../../assets/lOGO.svg';
import AuthContext from '../../../context/AuthContext';

const LogInForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        onClose();
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="login-form-container modal">
        <button className="close-button" onClick={onClose}>✕</button>
        <img src={lOGO} alt="Logo" className="logo-form" />
        <form className="login-form" onSubmit={handleLogin}>
          <ModalInput
            placeholder="Логин или почта"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <ModalInput
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ModalButton type="submit">Войти</ModalButton>
        </form>
      </div>
    </div>
  );
};

export default LogInForm;

