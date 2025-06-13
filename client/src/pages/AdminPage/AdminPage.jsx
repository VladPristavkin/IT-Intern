import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import TeacherProfileMenu from '../../components/ProfileMenu/TeacherProfileMenu';
import TeacherManagementCard from '../../components/TeacherManagementCard/TeacherManagementCard';
import TeacherManagementModal from '../../components/TeacherManagementModal/TeacherManagementModal';
import SystemConfigPanel from '../../components/SystemConfigPanel/SystemConfigPanel';
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';
import './AdminPage.css';

const AdminPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [activeTab, setActiveTab] = useState('teachers');
    const { user, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTeachers = () => {
            const savedTeachers = db.getAll('users').filter(user => user.role === 'teacher') || [];
            setTeachers(savedTeachers);
            setIsLoading(false);
        };
        
        loadTeachers();
    }, []);

    // Handle loading state
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    // Handle authentication
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // Check admin status
    const dbUser = db.getUserById(user.userId);
    if (!dbUser?.isAdmin) {
        return <div>Доступ запрещен</div>;
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
            if (teacherInfo.id) {
                db.update('users', teacherInfo);
            } else {
                db.insert('users', teacherInfo);
            }
        }
        setIsModalOpen(false);
        setSelectedTeacher(null);
    };

    const handleDeleteTeacher = (teacherId) => {
        db.delete('users', teacherId);
        setTeachers(prev => prev.filter(teacher => teacher.userId === teacherId));
    };

    return (
        <div className="admin-page-container">
            <TeacherProfileMenu />
            <div className="admin-content-container">
                <div className="admin-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'teachers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('teachers')}
                    >
                        Управление преподавателями
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'config' ? 'active' : ''}`}
                        onClick={() => setActiveTab('config')}
                    >
                        Настройки системы
                    </button>
                </div>

                {activeTab === 'teachers' ? (
                    <div className="teachers-section">
                        <div className="admin-header">
                            <h1>Управление преподавателями</h1>
                            <button className="add-teacher-button" onClick={handleAddTeacher}>
                                Добавить преподавателя
                            </button>
                        </div>
                        
                        <div className="admin-info">
                            <p className="teachers-count">Всего преподавателей: {teachers.length}</p>
                        </div>

                        <div className="teachers-list">
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
                    <SystemConfigPanel />
                )}
            </div>

            <TeacherManagementModal
                open={isModalOpen}
                onClose={handleCloseModal}
                teacherData={selectedTeacher}
            />
        </div>
    );
};

export default AdminPage; 