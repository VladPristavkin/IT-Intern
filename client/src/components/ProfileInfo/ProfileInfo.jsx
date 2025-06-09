import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LocalStorageService, { STORAGE_KEYS } from '../../services/localStorageService';
import { showSuccess } from '../../components/Notification/NotificationProvider';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import './ProfileInfo.css';

const ProfileInfo = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...user,
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let storageKey;
    let items;
    
    if (user.role === 'student') {
      storageKey = STORAGE_KEYS.REGISTERED_STUDENTS;
    } else if (user.role === 'teacher') {
      storageKey = STORAGE_KEYS.TEACHER_APPLICATIONS;
    }

    items = LocalStorageService.getItem(storageKey, []);
    const updatedItems = items.map(item => {
      if (item.id === user.id) {
        return {
          ...item,
          ...formData,
          password: formData.password || item.password // Сохраняем старый пароль, если новый не указан
        };
      }
      return item;
    });

    LocalStorageService.setItem(storageKey, updatedItems);
    login({
      ...formData,
      password: formData.password || user.password
    });
    
    showSuccess('Успешно', 'Данные профиля обновлены');
    setIsEditing(false);
  };

  const renderStudentFields = () => (
    <div className="profile-section">
      <h3>Информация о студенте</h3>
      <div className="form-group">
        <label>Специальность</label>
        {isEditing ? (
          <input
            type="text"
            name="specialization"
            value={formData.specialization || ''}
            onChange={handleChange}
            className="form-input"
          />
        ) : (
          <p className="form-value">{user.specialization || 'Не указана'}</p>
        )}
      </div>
      <div className="form-group">
        <label>Год поступления</label>
        {isEditing ? (
          <input
            type="text"
            name="enrollmentYear"
            value={formData.enrollmentYear || ''}
            onChange={handleChange}
            className="form-input"
          />
        ) : (
          <p className="form-value">{user.enrollmentYear || 'Не указан'}</p>
        )}
      </div>
    </div>
  );

  const renderTeacherFields = () => (
    <div className="profile-section">
      <h3>Информация о преподавателе</h3>
      <div className="form-group">
        <label>Кафедра</label>
        {isEditing ? (
          <input
            type="text"
            name="department"
            value={formData.department || ''}
            onChange={handleChange}
            className="form-input"
          />
        ) : (
          <p className="form-value">{user.department || 'Не указана'}</p>
        )}
      </div>
      <div className="form-group">
        <label>Должность</label>
        {isEditing ? (
          <input
            type="text"
            name="position"
            value={formData.position || ''}
            onChange={handleChange}
            className="form-input"
          />
        ) : (
          <p className="form-value">{user.position || 'Не указана'}</p>
        )}
      </div>
      <div className="form-group">
        <label>Учёная степень</label>
        {isEditing ? (
          <input
            type="text"
            name="academicDegree"
            value={formData.academicDegree || ''}
            onChange={handleChange}
            className="form-input"
          />
        ) : (
          <p className="form-value">{user.academicDegree || 'Не указана'}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="profile-info-container">
      <ProfileHeader text={`Информация о ${user.role === 'student' ? 'студенте' : 'преподавателе'}`} />
      
      <div className="profile-card-container">
        <div className="profile-info-content">
          <div className="profile-section">
            <h3>Основная информация</h3>
            <div className="form-group">
              <label>ФИО</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleChange}
                  className="form-input"
                />
              ) : (
                <p className="form-value">{user.fullName || 'Не указано'}</p>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="form-input"
                />
              ) : (
                <p className="form-value">{user.email}</p>
              )}
            </div>

            <div className="form-group">
              <label>Имя пользователя</label>
              <p className="form-value">{user.username}</p>
            </div>

            {isEditing && (
              <div className="form-group">
                <label>Новый пароль (оставьте пустым, чтобы не менять)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            )}
          </div>

          {user.role === 'student' ? renderStudentFields() : renderTeacherFields()}

          <div className="form-actions">
            {!isEditing ? (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Редактировать
              </button>
            ) : (
              <>
                <button className="save-button" onClick={handleSubmit}>
                  Сохранить
                </button>
                <button
                  className="cancel-button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ ...user, password: '' });
                  }}
                >
                  Отмена
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo; 