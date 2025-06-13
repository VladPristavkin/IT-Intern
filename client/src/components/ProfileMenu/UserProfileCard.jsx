import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import AccountLogo from '../../assets/profile_account_circle.svg';
import Logout from '../../assets/logout.svg';
import AuthContext from '../../context/AuthContext';

const UserProfileCard = ({ username, userRole }) => {
  const navigate = useNavigate(); // Хук для навигации
  const { logout } = useContext(AuthContext);
  
 
  // Функция для обработки логаута
  const handleLogout = () => {
    logout();
    navigate("/"); // Перенаправление на главную страницу
  };

  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <div className="user-info">
          <div className="user-avatar">
            <img
              src={AccountLogo}
              alt="Account"
              className="account-logo"
            />
          </div>
          <div>
            <div className="username">{username}</div>
            <div className="user-role">{userRole}</div>
          </div>
        </div>
        <div className="profile-arrow">
          <img
            src={Logout}
            alt="Logout"
            className="logout"
            onClick={handleLogout} // Добавляем обработчик клика
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
