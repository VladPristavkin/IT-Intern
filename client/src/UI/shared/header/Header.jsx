import React, { useContext, useState } from 'react';
import './Header.css';
import lOGO from '../../../assets/lOGO.svg';
import AccountLogo from '../../../assets/profile_account_circle.svg';
import LogInForm from '../../../components/modals/login/LogInForm';
import RegistrationForm from '../../../components/modals/registration/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import db from '../../../utils/localDb';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginFormOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegistrationFormOpen(true);
  };

  const closeModals = () => {
    setIsLoginFormOpen(false);
    setIsRegistrationFormOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleAccountClick = () => {
    if (isAuthenticated && user) {

      var userRole = db.getUserById(user.userId).role;
      if (userRole === 'student') {
        navigate(`/student`);
      } else if (userRole === 'teacher') {
        navigate(`/teacher`);
      }
    }
  };

  return (
    <div className="header">
      {/* <header className="header"> */}
        <div className='header-container'>
          <img src={lOGO} alt="Logo" className="logo" onClick={handleLogoClick} />
          <div className="button-group-header">
            {isAuthenticated ? (
              <>
                <img
                  src={AccountLogo}
                  alt="Account"
                  className="account-logo-header"
                  onClick={handleAccountClick} // Обработчик клика для AccountLogo
                />
                <button className="logout-button" onClick={logout}>Выйти</button>
              </>
            ) : (
              <>
                <button className="login-button" onClick={handleLoginClick}>Войти</button>
                <button className="register-button" onClick={handleRegisterClick}>Регистрация</button>
              </>
            )}
          </div>
        </div>
      {/* </header> */}
      {isLoginFormOpen && <LogInForm onClose={closeModals} />}
      {isRegistrationFormOpen && <RegistrationForm onClose={closeModals} />}
    </div>
  );
};

export default Header;


