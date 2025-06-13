import React, {useContext} from 'react';
import './StudentCard.css';
import Avatar from '../../assets/UserPhoto.svg'
import AuthContext from '../../context/AuthContext';
import  db  from '../../utils/localDb';

const StudentCard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  
  const dbUser = db.getUserById(user.userId);
  if (dbUser.role !== 'student') {
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
          <div className="info-group">
            <div className="label">Пол</div>
            <div className="value">{dbUser.gender}</div>
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