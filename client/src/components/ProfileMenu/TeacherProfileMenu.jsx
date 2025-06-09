import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './ProfileMenu.css';
import lOGO from '../../assets/lOGO.svg';
import UserProfileCard from './UserProfileCard';
import ProfileHome from '../../assets/person.svg';
import TeacherTests from '../../assets/cases.svg';
import TeacherAnalytics from '../../assets/analytics.svg';
import AdminIcon from '../../assets/admin.svg';
import InternshipIcon from '../../assets/school.svg';

const TeacherProfileMenu = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();
    const { isAdmin } = useAuth();
    const testingIndicatorRef = useRef(null);
    const adminIndicatorRef = useRef(null);

    useEffect(() => {
        const path = location.pathname;
        let newActiveItem = null;

        if (path.includes('/teacher/tests')) {
            newActiveItem = 'tests';
        } else if (path.includes('/teacher/analytics')) {
            newActiveItem = 'analytics';
        } else if (path.includes('/teacher/admin')) {
            newActiveItem = 'admin';
        } else if (path === '/teacher') {
            newActiveItem = 'profile';
        } else if (path === '/internships') {
            newActiveItem = 'internships';
        }

        setActiveItem(newActiveItem);
        if (newActiveItem === 'tests' || newActiveItem === 'admin') {
            setOpenMenu(newActiveItem);
        }

        // Обновляем положение индикаторов
        setTimeout(() => {
            if (testingIndicatorRef.current) {
                testingIndicatorRef.current.style.transform = path.includes('/teacher/tests/results') ? 'translateY(42px)' : 'translateY(0px)';
            }
            if (adminIndicatorRef.current) {
                adminIndicatorRef.current.style.transform = path.includes('/teacher/admin/teachers') ? 'translateY(42px)' : 'translateY(0px)';
            }
        }, 0);
    }, [location]);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div className="sidebar">
            <div className="logo-section">
                <img src={lOGO} alt="Logo" className="logo" />
            </div>
            <UserProfileCard />
            <div className="menu-container">
                <NavLink to="/teacher" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} end>
                    <div className="menu-item-label">
                        <img src={ProfileHome} alt="Profile home" className="menu-icon" />
                        <span>Профиль</span>
                    </div>
                </NavLink>
                <div>
                    <button onClick={() => toggleMenu('tests')} className={`menu-item menu-toggle ${openMenu === 'tests' ? 'menu-active' : ''} ${activeItem === 'tests' ? 'active' : ''}`}>
                        <div className="menu-item-label">
                            <img src={TeacherTests} alt="Teacher tests" className="menu-icon" />
                            <span>Тестирование</span>
                        </div>
                    </button>
                    {openMenu === 'tests' && (
                        <div className="submenu">
                            <div className="indicator-bar">
                                <div className="indicator-active" ref={testingIndicatorRef}></div>
                            </div>
                            <div className='submenu-items'>
                                <NavLink to="/teacher/tests/create" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>Создать тест</NavLink>
                                <NavLink to="/teacher/tests/list" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>Мои тесты</NavLink>
                            </div>
                        </div>
                    )}
                </div>
                <NavLink to="/teacher/analytics" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <div className="menu-item-label">
                        <img src={TeacherAnalytics} alt="Teacher Analytics" className="menu-icon" />
                        <span>Аналитика</span>
                    </div>
                </NavLink>
                <div className="menu-divider"></div>
                <NavLink to="/internships" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <div className="menu-item-label">
                        <img src={InternshipIcon} alt="Internships" className="menu-icon" />
                        <span>Стажировки студентам</span>
                    </div>
                </NavLink>
                {isAdmin && (
                    <div>
                        <button onClick={() => toggleMenu('admin')} className={`menu-item menu-toggle ${openMenu === 'admin' ? 'menu-active' : ''} ${activeItem === 'admin' ? 'active' : ''}`}>
                            <div className="menu-item-label">
                                <img src={AdminIcon} alt="Admin Panel" className="menu-icon" />
                                <span>Администрирование</span>
                            </div>
                        </button>
                        {openMenu === 'admin' && (
                            <div className="submenu">
                                <div className="indicator-bar">
                                    <div className="indicator-active" ref={adminIndicatorRef}></div>
                                </div>
                                <div className='submenu-items'>
                                    <NavLink to="/teacher/admin/applications" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>Заявки преподавателей</NavLink>
                                    <NavLink to="/teacher/admin/teachers" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>Управление преподавателями</NavLink>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherProfileMenu; 