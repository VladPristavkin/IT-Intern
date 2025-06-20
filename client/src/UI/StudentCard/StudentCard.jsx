import React, { useContext } from 'react';
import './StudentCard.css';
import Avatar from '../../assets/UserPhoto.svg'
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';

const StudentCard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  // Return empty div if not authenticated or no user
  if (!isAuthenticated || !user) {
    return <div className="card-container"></div>;
  }

  // Get user data from local DB
  const dbUser = db.getUserById(user.userId);
  
  // Return empty div if user not found or not a student
  if (!dbUser || dbUser.role !== 'student') {
    return <div className="card-container"></div>;
  }

  return (
    <div className="card-container">
      <div className="card">
        <div className="profile-section">
          <div className="avatar">
            <img
              src={Avatar}
              alt="Avatar"
              className="account-avatar"
            />
          </div>
        </div>
        <div className="info-section">
          <div className="info-group">
            <div className="label">ФИО</div>
            <div className="value name">{dbUser.name}</div>
          </div>
          
          <div className="info-row">
            <div className="info-column">
              <div className="label">Роль</div>
              <div className="value">Студент</div>
            </div>
            <div className="info-column">
              <div className="label">Группа</div>
              <div className="value">{dbUser.speciality}</div>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-column">
              <div className="label">Никнейм</div>
              <div className="value">{dbUser.username}</div>
            </div>
            <div className="info-column">
              <div className="label">Почта</div>
              <div className="value email">{dbUser.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;