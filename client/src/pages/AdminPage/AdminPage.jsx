import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import TeacherProfileMenu from '../../components/ProfileMenu/TeacherProfileMenu';
import TeacherManagementCard from '../../components/TeacherManagementCard/TeacherManagementCard';
import TeacherManagementModal from '../../components/TeacherManagementModal/TeacherManagementModal';
import SystemConfigPanel from '../../components/SystemConfigPanel/SystemConfigPanel';
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';
import { v4 as uuidv4 } from 'uuid';
import './AdminPage.css';
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground';

const AdminPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [activeTab, setActiveTab] = useState('teachers');
    const { user, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    const loadTeachers = () => {
        const savedTeachers = db.getAll('users').filter(user => user.role === 'teacher') || [];
        setTeachers(savedTeachers);
        setIsLoading(false);
    };

    useEffect(() => {
        loadTeachers();
    }, []);

    // Handle loading state
    if (isLoading) {
        return <div className="admin-loading">Загрузка...</div>;
    }

    // Handle authentication
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    const handleAddTeacher = () => {
        setSelectedTeacher(null);
        setIsModalOpen(true);
    };

    const handleEditTeacher = (teacher) => {
        setSelectedTeacher(teacher);
        setIsModalOpen(true);
    };

    const handleCloseModal = (teacherInfo) => {
        if (teacherInfo) {
            if (teacherInfo.userId) {
                // Обновление существующего преподавателя
                db.update('users', teacherInfo.userId, teacherInfo);
            } else {
                // Добавление нового преподавателя
                const newTeacher = {
                    ...teacherInfo,
                    userId: uuidv4(),
                };
                db.insert('users', newTeacher);
            }
            // Обновляем список преподавателей
            loadTeachers();
        }
        setIsModalOpen(false);
        setSelectedTeacher(null);
    };

    const handleDeleteTeacher = (teacherId) => {
        // Don't allow deleting the default admin
        if (teacherId === 'admin_default_id') {
            alert('Невозможно удалить главного администратора');
            return;
        }
        db.delete('users', teacherId);
        setTeachers(prev => prev.filter(teacher => teacher.userId !== teacherId));
    };

    return (
        <div className="admin-page-container">
            <TeacherProfileMenu />
            {/* <div className="admin-content-container"> */}
                <BackgroundProfile>
                <div className="admin-tabs">
                    <button 
                        className={`admin-tab-button ${activeTab === 'teachers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('teachers')}
                    >
                        Управление преподавателями
                    </button>
                    <button 
                        className={`admin-tab-button ${activeTab === 'config' ? 'active' : ''}`}
                        onClick={() => setActiveTab('config')}
                    >
                        Настройки системы
                    </button>
                </div>

                    {activeTab === 'teachers' ? (
                        <div className="admin-section">
                            <div className="admin-header">
                                <h1 className="admin-header-title">Управление преподавателями</h1>
                                <button className="admin-add-teacher-button" onClick={handleAddTeacher}>
                                    Добавить преподавателя
                                </button>
                            </div>
                            
                            <div className="admin-info">
                                <p className="admin-teachers-count">Всего преподавателей: {teachers.length}</p>
                            </div>

                            <div className="admin-teachers-list">
                                {teachers.map(teacher => (
                                    <TeacherManagementCard
                                        key={teacher.userId}
                                        teacher={teacher}
                                        onEdit={handleEditTeacher}
                                        onDelete={handleDeleteTeacher}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="admin-section">
                            <SystemConfigPanel />
                        </div>
                    )}
            </BackgroundProfile>
            <TeacherManagementModal
                open={isModalOpen}
                onClose={handleCloseModal}
                teacherData={selectedTeacher}
            />
        </div>
    );
};

export default AdminPage; 