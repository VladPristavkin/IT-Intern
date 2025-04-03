import React from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import AccountLogo from '../../assets/profile_account_circle.svg';
import Logout from '../../assets/logout.svg';

const UserProfileCard = () => {
  const navigate = useNavigate(); // Хук для навигации

  // Функция для обработки логаута
  const handleLogout = () => {
    // Здесь может быть логика для очистки данных пользователя (например, удаления токена, сессии и т.п.)
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
            <div className="username">SamostBrodit123</div>
            <div className="user-role">Студент</div>
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
