import React, {useState, useContext} from 'react';
import './TeacherCard.css';
import Avatar from '../../assets/UserPhoto.svg'
import AuthContext from '../../context/AuthContext';
import  db  from '../../utils/localDb';

const TeacherCard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated || !user) {
    return null; // Don't render anything if user is not authenticated
  }

  const dbUser = db.getUserById(user.userId);
  if (!dbUser || dbUser.role !== 'teacher') {
    return null;
  }
  return (
    <div className="teacher-card-container">
      <div className="teacher-card">
        <div className="teacher-profile-section">
          <div className="teacher-avatar">
          <img
                    src={Avatar}
                    alt="Avatar"
                    className="teacher-account-avatar"
                />
          </div>
        </div>
        <div className="teacher-info-section">
          <div className="teacher-info-group">
            <div className="teacher-label">ФИО</div>
            <div className="teacher-value name">{dbUser.name}</div>
          </div>
          
          <div className="teacher-info-row">
            <div className="teacher-info-column">
              <div className="teacher-label">Роль</div>
              <div className="teacher-value">{dbUser.isAdmin === false ? 'Преподаватель' : 'Администратор'}</div>
            </div>
            <div className="teacher-info-column">
              <div className="teacher-label">Кафедра</div>
              <div className="teacher-value">{dbUser.department}</div>
            </div>
          </div>
          
          <div className="teacher-info-row">
            <div className="teacher-info-column">
              <div className="teacher-label">Никнейм</div>
              <div className="teacher-value">{dbUser.username}</div>
            </div>
            <div className="teacher-info-column">
              <div className="teacher-label">Почта</div>
              <div className="teacher-value email">{dbUser.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;