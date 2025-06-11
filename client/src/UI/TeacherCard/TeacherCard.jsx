
import React from 'react';
import './TeacherCard.css';
import Avatar from '../../assets/UserPhoto.svg'

const TeacherCard = () => {
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
            <div className="value name">Сергиенко Ольга Валерьевна</div>
          </div>
          
          <div className="info-row">
            <div className="info-column">
              <div className="label">Роль</div>
              <div className="value">Преподаватель</div>
            </div>
            <div className="info-column">
              <div className="label">Кафедра</div>
              <div className="value">ПОИТ</div>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-column">
              <div className="label">Никнейм</div>
              <div className="value">SuckMaster</div>
            </div>
            <div className="info-column">
              <div className="label">Почта</div>
              <div className="value email">suckmaster@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;