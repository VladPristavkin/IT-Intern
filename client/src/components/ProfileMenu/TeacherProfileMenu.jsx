import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './ProfileMenu.css';
import lOGO from '../../assets/lOGO.svg';
import UserProfileCard from './UserProfileCard';
import ProfileHome from '../../assets/person.svg';
import TeacherTesting from '../../assets/person_raised_hand.svg';
import TeacherAnalytics from '../../assets/insert_chart.svg';
import Internships from '../../assets/work.svg';
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';

const TeacherProfileMenu = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const indicatorRef = useRef(null);
    const { user, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {

        const path = location.pathname;
        let newActiveItem = null;

        if (path.includes('/teacher/testing')) {
            newActiveItem = 'testing';
        } else if (path.includes('/teacher/analytics')) {
            newActiveItem = 'analytics';
        } else if (path === '/teacher') {
            newActiveItem = 'profile';
        }

        if (newActiveItem === 'testing' || newActiveItem === 'analytics') {
            setOpenMenu(newActiveItem);
        }

        // Update indicator position after re-render
        setTimeout(() => {
            if (indicatorRef.current) {
                if (path.includes('/teacher/testing/results') || path.includes('/teacher/analytics/students')) {
                    indicatorRef.current.style.transform = 'translateY(42px)';
                } else {
                    indicatorRef.current.style.transform = 'translateY(0px)';
                }
            }
        }, 0);
    }, [location, isAuthenticated, navigate]);

    useEffect(() => {
        if (activeItem === 'testing' || activeItem === 'analytics') {
            setOpenMenu(activeItem);
        }
    }, [activeItem]);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    // Return null if not authenticated
    if (!isAuthenticated || !user) {
        return null;
    }

    // Get user data and check role
    const dbUser = db.getUserById(user.userId);
    if (!dbUser || dbUser.role !== 'teacher') {
        return null;
    }

    return (
        <div className="sidebar">
            <div className="logo-section">
                <img src={lOGO} alt="Logo" className="logo" />
            </div>
            <UserProfileCard username={dbUser.username} userRole={dbUser.isAdmin === false ? 'Преподаватель' : 'Администратор'} />
            <div className="menu-container">
                <NavLink to="/teacher" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} end>
                    <div className="menu-item-label">
                        <img src={ProfileHome} alt="Profile home" className="menu-icon" />
                        <span>Профиль</span>
                    </div>
                </NavLink>
                <NavLink to="/teacher/testing" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} end>
                    <div className="menu-item-label">
                        <img src={TeacherTesting} alt="Teacher testing" className="menu-icon" />
                        <span>Тестирование</span>
                    </div>
                </NavLink>
                <div>
                    <button onClick={() => toggleMenu('analytics')} className={`menu-item menu-toggle ${openMenu === 'analytics' ? 'menu-active' : ''} ${activeItem === 'analytics' ? 'active' : ''}`}>
                        <div className="menu-item-label">
                            <img src={TeacherAnalytics} alt="Teacher Analytics" className="menu-icon" />
                            <span>Аналитика</span>
                        </div>
                    </button>
                    {openMenu === 'analytics' && (
                        <div className="submenu">
                            <div className="indicator-bar">
                                <div className="indicator-active" ref={indicatorRef}></div>
                            </div>
                            <div className='submenu-items'>
                                <NavLink to="/teacher/analytics/students" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>Студенты</NavLink>
                                <NavLink to="/teacher/analytics/disciplines" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>Дисциплины</NavLink>
                            </div>
                        </div>
                    )}
                </div>
                {dbUser.isAdmin && (
                    <NavLink to="/admin" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} end>
                        <div className="menu-item-label">
                            <img src={ProfileHome} alt="Profile home" className="menu-icon" />
                            <span>Админ панель</span>
                        </div>
                    </NavLink>
                )}
                <NavLink to="/search" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <div className="menu-item-label">
                        <img src={Internships} alt="Internships" className="menu-icon" />
                        <span>Стажировки студентам</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default TeacherProfileMenu;
