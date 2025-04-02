
import React from 'react';
import './StudentCard.css';
import Avatar from '../../assets/UserPhoto.svg'

const StudentCard = () => {
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
            <div className="value name">Приставкин Владислав Александрович</div>
          </div>
          
          <div className="info-row">
            <div className="info-column">
              <div className="label">Роль</div>
              <div className="value">Студент</div>
            </div>
            <div className="info-column">
              <div className="label">Группа</div>
              <div className="value">ПИР-211</div>
            </div>
          </div>
          
          <div className="info-group">
            <div className="label">Пол</div>
            <div className="value">Мужской</div>
          </div>
          
          <div className="info-row">
            <div className="info-column">
              <div className="label">Никнейм</div>
              <div className="value">SamostBrodit123</div>
            </div>
            <div className="info-column">
              <div className="label">Почта</div>
              <div className="value email">vladpristavkin@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;