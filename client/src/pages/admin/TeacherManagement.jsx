import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LocalStorageService, { STORAGE_KEYS } from '../../services/localStorageService';
import { showSuccess, showError } from '../../components/Notification/NotificationProvider';
import TeacherLayout from '../../layouts/TeacherLayout';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import './AdminPage.css';

const TeacherManagement = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [approvedTeachers, setApprovedTeachers] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/teacher');
      return;
    }

    loadTeachers();
  }, [isAdmin, navigate]);

  const loadTeachers = () => {
    const applications = LocalStorageService.getItem(STORAGE_KEYS.TEACHER_APPLICATIONS, []);
    const approved = applications.filter(app => app.status === 'approved');
    setApprovedTeachers(approved);
  };

  const handleRemove = (teacher) => {
    if (teacher.username === 'admin123') {
      showError('Ошибка', 'Невозможно удалить базового администратора');
      return;
    }

    if (teacher.id === user.id) {
      showError('Ошибка', 'Вы не можете удалить свой аккаунт');
      return;
    }

    const applications = LocalStorageService.getItem(STORAGE_KEYS.TEACHER_APPLICATIONS, []);
    const updatedApplications = applications.filter(app => app.id !== teacher.id);

    LocalStorageService.setItem(STORAGE_KEYS.TEACHER_APPLICATIONS, updatedApplications);
    showSuccess('Успешно', 'Преподаватель удален из системы');
    loadTeachers();
  };

  const toggleAdminStatus = (teacher) => {
    if (teacher.username === 'admin123') {
      showError('Ошибка', 'Невозможно изменить права базового администратора');
      return;
    }

    if (teacher.id === user.id) {
      showError('Ошибка', 'Вы не можете изменить свои права администратора');
      return;
    }

    const applications = LocalStorageService.getItem(STORAGE_KEYS.TEACHER_APPLICATIONS, []);
    const updatedApplications = applications.map(app => {
      if (app.id === teacher.id) {
        return { ...app, isAdmin: !app.isAdmin };
      }
      return app;
    });

    LocalStorageService.setItem(STORAGE_KEYS.TEACHER_APPLICATIONS, updatedApplications);
    showSuccess('Успешно', `Статус администратора ${!teacher.isAdmin ? 'добавлен' : 'удален'}`);
    loadTeachers();
  };

  const isBaseAdmin = (teacher) => teacher.username === 'admin123';
  const isSelf = (teacher) => teacher.id === user.id;

  return (
    <TeacherLayout
      header={<ProfileHeader text="Управление преподавателями" />}
    >
      <section className="approved-teachers">
        {approvedTeachers.length === 0 ? (
          <p>Нет подтвержденных преподавателей</p>
        ) : (
          <div className="teachers-grid">
            {approvedTeachers.map(teacher => (
              <div key={teacher.id} className="teacher-card">
                <h3>{teacher.fullName || teacher.username}</h3>
                <p>Email: {teacher.email}</p>
                <p>Статус: {teacher.isAdmin ? 'Администратор' : 'Преподаватель'}</p>
                <p>Подтвержден: {new Date(teacher.approvedAt).toLocaleDateString()}</p>
                <div className="action-buttons">
                  {!isBaseAdmin(teacher) && !isSelf(teacher) && (
                    <>
                      <button 
                        className={`admin-toggle-button ${teacher.isAdmin ? 'remove-admin' : 'make-admin'}`}
                        onClick={() => toggleAdminStatus(teacher)}
                      >
                        {teacher.isAdmin ? 'Убрать права админа' : 'Сделать админом'}
                      </button>
                      <button 
                        className="reject-button"
                        onClick={() => handleRemove(teacher)}
                      >
                        Удалить из системы
                      </button>
                    </>
                  )}
                  {(isBaseAdmin(teacher) || isSelf(teacher)) && (
                    <p className="action-disabled-message">
                      {isBaseAdmin(teacher) ? 'Базовый администратор' : 'Ваш аккаунт'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </TeacherLayout>
  );
};

export default TeacherManagement; 