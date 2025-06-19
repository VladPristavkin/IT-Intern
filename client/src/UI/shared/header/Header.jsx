import React, { useContext, useState } from 'react';
import './Header.css';
import lOGO from '../../../assets/lOGO.svg';
import AccountLogo from '../../../assets/profile_account_circle.svg';
import LogInForm from '../../../components/modals/login/LogInForm';
import RegistrationForm from '../../../components/modals/registration/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

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
    if (isAuthenticated && user && user.roles) {
      console.log('User roles:', user.roles); // Debug log
      
      if (user.roles.includes('Student')) {
        navigate('/student');
      } else if (user.roles.includes('Teacher') || user.roles.includes('Administrator')) {
        navigate('/teacher');
      }
    } else {
      console.log('Auth state:', { isAuthenticated, user }); // Debug log
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
                  onClick={handleAccountClick}
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


