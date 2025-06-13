
import React from 'react';
import './TeacherCard.css';
import Avatar from '../../assets/UserPhoto.svg'

const TeacherCard = () => {
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
            <div className="teacher-value name">Сергиенко Ольга Валерьевна</div>
          </div>
          
          <div className="teacher-info-row">
            <div className="teacher-info-column">
              <div className="teacher-label">Роль</div>
              <div className="teacher-value">Преподаватель</div>
            </div>
            <div className="teacher-info-column">
              <div className="teacher-label">Кафедра</div>
              <div className="teacher-value">ПОИТ</div>
            </div>
          </div>
          
          <div className="teacher-info-row">
            <div className="teacher-info-column">
              <div className="teacher-label">Никнейм</div>
              <div className="teacher-value">SomeNick</div>
            </div>
            <div className="teacher-info-column">
              <div className="teacher-label">Почта</div>
              <div className="teacher-value email">somenick@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;