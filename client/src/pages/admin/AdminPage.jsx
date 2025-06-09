import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LocalStorageService, { STORAGE_KEYS } from '../../services/localStorageService';
import { showSuccess } from '../../components/Notification/NotificationProvider';
import TeacherLayout from '../../layouts/TeacherLayout';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import './AdminPage.css';

const TeacherApplications = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [teacherApplications, setTeacherApplications] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/teacher');
      return;
    }

    loadApplications();
  }, [isAdmin, navigate]);

  const loadApplications = () => {
    const applications = LocalStorageService.getItem(STORAGE_KEYS.TEACHER_APPLICATIONS, []);
    const pending = applications.filter(app => app.status === 'pending');
    setTeacherApplications(pending);
  };

  const handleApprove = (application) => {
    const applications = LocalStorageService.getItem(STORAGE_KEYS.TEACHER_APPLICATIONS, []);
    const updatedApplications = applications.map(app => {
      if (app.id === application.id) {
        return { ...app, status: 'approved', approvedBy: user.username, approvedAt: new Date().toISOString() };
      }
      return app;
    });

    LocalStorageService.setItem(STORAGE_KEYS.TEACHER_APPLICATIONS, updatedApplications);
    showSuccess('Успешно', 'Преподаватель успешно подтвержден');
    loadApplications();
  };

  const handleReject = (application) => {
    const applications = LocalStorageService.getItem(STORAGE_KEYS.TEACHER_APPLICATIONS, []);
    const updatedApplications = applications.filter(app => app.id !== application.id);

    LocalStorageService.setItem(STORAGE_KEYS.TEACHER_APPLICATIONS, updatedApplications);
    showSuccess('Успешно', 'Заявка отклонена');
    loadApplications();
  };

  return (
    <TeacherLayout
      header={<ProfileHeader text="Заявки преподавателей" />}
    >
      <section className="pending-applications">
        {teacherApplications.length === 0 ? (
          <p>Нет новых заявок</p>
        ) : (
          <div className="applications-grid">
            {teacherApplications.map(application => (
              <div key={application.id} className="application-card">
                <h3>{application.fullName || application.username}</h3>
                <p>Email: {application.email}</p>
                <p>Дата подачи: {new Date(application.dateSubmitted).toLocaleDateString()}</p>
                <div className="action-buttons">
                  <button 
                    className="approve-button"
                    onClick={() => handleApprove(application)}
                  >
                    Подтвердить
                  </button>
                  <button 
                    className="reject-button"
                    onClick={() => handleReject(application)}
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </TeacherLayout>
  );
};

export default TeacherApplications; 