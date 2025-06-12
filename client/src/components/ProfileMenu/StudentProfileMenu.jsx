import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './ProfileMenu.css';
import lOGO from '../../assets/lOGO.svg';
import UserProfileCard from './UserProfileCard';
import ProfileHome from '../../assets/person.svg';
import StudentsTesting from '../../assets/person_raised_hand.svg';
import StudentsAnalytics from '../../assets/insert_chart.svg';
import SavedVacancies from '../../assets/bookmarks.svg';
import LookForJob from '../../assets/work.svg';

const StudentProfileMenu = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();
    const indicatorRef = useRef(null);

    useEffect(() => {
        const path = location.pathname;
        let newActiveItem = null;

        if (path.includes('/student/testing')) {
            newActiveItem = 'testing';
        } else if (path.includes('/student/suggested') || path.includes('/student/analytics')) {
            newActiveItem = 'analytics';
        } else if (path.includes('/student/saved')) {
            newActiveItem = 'saved';
        } else if (path === '/student') {
            newActiveItem = 'profile';
        } else if (path === '/') {
            newActiveItem = 'job-search';
        }

        if (newActiveItem === 'testing' || newActiveItem === 'analytics') {
            setOpenMenu(newActiveItem);
        }

        // Обновляем положение индикатора после перерисовки
        setTimeout(() => {
            if (indicatorRef.current) {
                if (path.includes('/student/testing/history') || path.includes('/student/suggested')) {
                    indicatorRef.current.style.transform = 'translateY(42px)';
                } else {
                    indicatorRef.current.style.transform = 'translateY(0px)';
                }
            }
        }, 0);
    }, [location]);

    useEffect(() => {
        if (activeItem === 'testing' || activeItem === 'analytics') {
            setOpenMenu(activeItem);
        }
    }, [activeItem]);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const userData = {
        username: "VladPristavkin",
        userRole: "Студент"
    };

    return (
        <div className="sidebar">
            <div className="logo-section">
                <img src={lOGO} alt="Logo" className="logo" />
            </div>
            <UserProfileCard username={userData.username} userRole={userData.userRole} />
            <div className="menu-container">
                <NavLink to="/student" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} end>
                    <div className="menu-item-label">
                        <img src={ProfileHome} alt="Profile home" className="menu-icon" />
                        <span>Профиль</span>
                    </div>
                </NavLink>
                <div>
                    <button onClick={() => toggleMenu('testing')} className={`menu-item menu-toggle ${openMenu === 'testing' ? 'menu-active' : ''} ${activeItem === 'testing' ? 'active' : ''}`}>
                        <div className="menu-item-label">
                            <img src={StudentsTesting} alt="Student testing" className="menu-icon" />
                            <span>Тестирование</span>
                        </div>
                    </button>
                    {openMenu === 'testing' && (
                        <div className="submenu">
                            <div className="indicator-bar">
                                <div className="indicator-active" ref={indicatorRef}></div>
                            </div>
                            <div className='submenu-items'>
                                <NavLink to="/student/testing" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>Прохождение теста</NavLink>
                                <NavLink to="/student/testing/history" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>История прохождений</NavLink>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <button onClick={() => toggleMenu('analytics')} className={`menu-item menu-toggle ${openMenu === 'analytics' ? 'menu-active' : ''} ${activeItem === 'analytics' ? 'active' : ''}`}>
                        <div className="menu-item-label">
                            <img src={StudentsAnalytics} alt="Students Analytics" className="menu-icon" />
                            <span>Аналитика</span>
                        </div>
                    </button>
                    {openMenu === 'analytics' && (
                        <div className="submenu">
                            <div className="indicator-bar">
                                <div className="indicator-active" ref={indicatorRef}></div>
                            </div>
                            <div className='submenu-items'>
                                <NavLink to="/student/analytics" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>Сравнение навыков</NavLink>
                                <NavLink to="/student/suggested" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>Подбор вакансий</NavLink>
                            </div>
                        </div>
                    )}
                </div>
                <NavLink to="/student/saved" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <div className="menu-item-label">
                        <img src={SavedVacancies} alt="Saved Vacancies" className="menu-icon" />
                        <span>Сохранённые</span>
                    </div>
                </NavLink>
                <div className="menu-divider"></div>
                <NavLink to="/" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <div className="menu-item-label">
                        <img src={LookForJob} alt="Look for job" className="menu-icon" />
                        <span>Поиск работы</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default StudentProfileMenu;
