import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import AccountLogo from '../../assets/profile_account_circle.svg';
import Logout from '../../assets/logout.svg';

const UserProfileCard = () => {
  const navigate = useNavigate();
  const { user, logout: authLogout } = useAuth();

  const handleLogout = () => {
    authLogout();
  };

  const getUserRole = () => {
    if (!user) return '';
    if (user.isAdmin) return 'Администратор';
    if (user.role === 'teacher') return 'Преподаватель';
    return 'Студент';
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
            <div className="username">{user?.username || 'Гость'}</div>
            <div className="user-role">{getUserRole()}</div>
          </div>
        </div>
        <div className="profile-arrow">
          <img
            src={Logout}
            alt="Logout"
            className="logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
