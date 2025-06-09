import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './TeacherCard.css';
import Avatar from '../../assets/UserPhoto.svg'

const TeacherCard = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
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
            <div className="value name">{user.fullName || 'Не указано'}</div>
          </div>
          
          <div className="info-row">
            <div className="info-column">
              <div className="label">Роль</div>
              <div className="value">{user.isAdmin ? 'Администратор' : 'Преподаватель'}</div>
            </div>
            <div className="info-column">
              <div className="label">Кафедра</div>
              <div className="value">{user.department || 'Не указана'}</div>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-column">
              <div className="label">Должность</div>
              <div className="value">{user.position || 'Не указана'}</div>
            </div>
            <div className="info-column">
              <div className="label">Учёная степень</div>
              <div className="value">{user.academicDegree || 'Не указана'}</div>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-column">
              <div className="label">Имя пользователя</div>
              <div className="value">{user.username || 'Не указано'}</div>
            </div>
            <div className="info-column">
              <div className="label">Почта</div>
              <div className="value email">{user.email || 'Не указана'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard; 