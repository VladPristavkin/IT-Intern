import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './StudentCard.css';
import Avatar from '../../assets/UserPhoto.svg'

const StudentCard = () => {
  const { user } = useAuth();

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
              <div className="value">{user.role === 'student' ? 'Студент' : 'Не указано'}</div>
            </div>
            <div className="info-column">
              <div className="label">Специальность</div>
              <div className="value">{user.specialization || 'Не указана'}</div>
            </div>
          </div>
          
          <div className="info-group">
            <div className="label">Год поступления</div>
            <div className="value">{user.enrollmentYear || 'Не указан'}</div>
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

export default StudentCard;