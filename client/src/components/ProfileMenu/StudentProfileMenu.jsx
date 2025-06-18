import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useLocation, Navigate } from 'react-router-dom';
import './ProfileMenu.css';
import lOGO from '../../assets/lOGO.svg';
import UserProfileCard from './UserProfileCard';
import ProfileHome from '../../assets/person.svg';
import StudentsTesting from '../../assets/person_raised_hand.svg';
import StudentsAnalytics from '../../assets/insert_chart.svg';
import SavedVacancies from '../../assets/bookmarks.svg';
import LookForJob from '../../assets/work.svg';
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';

const StudentProfileMenu = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const location = useLocation();
    const testingIndicatorRef = useRef(null);
    const analyticsIndicatorRef = useRef(null);
    const { user, isAuthenticated } = useContext(AuthContext);

    // Функция для получения активной секции и подсекции
    const getActiveSection = (path) => {
        if (path.includes('/student/testing')) {
            return {
                section: 'testing',
                subsection: path.includes('/student/testing/history') ? 'history' : 'main'
            };
        }
        if (path.includes('/student/analytics') || path.includes('/student/suggested')) {
            return {
                section: 'analytics',
                subsection: path.includes('/student/suggested') ? 'suggested' : 'main'
            };
        }
        if (path.includes('/student/saved')) return { section: 'saved' };
        if (path === '/student') return { section: 'profile' };
        if (path === '/') return { section: 'job-search' };
        return { section: null };
    };

    // Функция для обновления позиции индикатора
    const updateIndicatorPosition = (section, subsection) => {
        const indicatorRef = section === 'testing' ? testingIndicatorRef : analyticsIndicatorRef;
        
        if (!indicatorRef.current) return;

        // Используем requestAnimationFrame для плавной анимации
        requestAnimationFrame(() => {
            const translateY = subsection === 'main' ? '0px' : '42px';
            indicatorRef.current.style.transform = `translateY(${translateY})`;
        });
    };

    useEffect(() => {
        const { section, subsection } = getActiveSection(location.pathname);
        
        // Открываем нужное меню
        if (section === 'testing' || section === 'analytics') {
            setOpenMenu(section);
            
            // Небольшая задержка для завершения анимации открытия меню
            const timer = setTimeout(() => {
                updateIndicatorPosition(section, subsection);
            }, 100);
            
            return () => clearTimeout(timer);
        } else {
            // Закрываем подменю если мы не в секциях с подменю
            setOpenMenu(null);
        }
    }, [location.pathname]);

    const toggleMenu = (menu) => {
        const newOpenState = openMenu === menu ? null : menu;
        setOpenMenu(newOpenState);
        
        // Если открываем меню, обновляем позицию индикатора
        if (newOpenState) {
            const { section, subsection } = getActiveSection(location.pathname);
            if (section === newOpenState) {
                setTimeout(() => {
                    updateIndicatorPosition(section, subsection);
                }, 150); // Даем время для анимации открытия
            }
        }
    };

    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // Get user data from local DB
    const dbUser = db.getUserById(user.userId);
    
    // Redirect to home if user is not a student
    if (!dbUser || dbUser.role !== 'student') {
        return <Navigate to="/" replace />;
    }

    const { section: activeSection } = getActiveSection(location.pathname);

    return (
        <div className="sidebar">
            <div className="logo-section">
                <img src={lOGO} alt="Logo" className="logo" />
            </div>
            <UserProfileCard username={dbUser.username} userRole='Студент' />
            <div className="menu-container">
                <NavLink to="/student" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} end>
                    <div className="menu-item-label">
                        <img src={ProfileHome} alt="Profile home" className="menu-icon" />
                        <span>Профиль</span>
                    </div>
                </NavLink>
                
                <div>
                    <button 
                        onClick={() => toggleMenu('testing')} 
                        className={`menu-item menu-toggle ${openMenu === 'testing' ? 'menu-active' : ''} ${activeSection === 'testing' ? 'active' : ''}`}
                    >
                        <div className="menu-item-label">
                            <img src={StudentsTesting} alt="Student testing" className="menu-icon" />
                            <span>Тестирование</span>
                        </div>
                    </button>
                    {openMenu === 'testing' && (
                        <div className="submenu">
                            <div className="indicator-bar">
                                <div className="indicator-active" ref={testingIndicatorRef}></div>
                            </div>
                            <div className='submenu-items'>
                                <NavLink to="/student/testing" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>
                                    Прохождение теста
                                </NavLink>
                                <NavLink to="/student/testing/history" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>
                                    История прохождений
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
                
                <div>
                    <button 
                        onClick={() => toggleMenu('analytics')} 
                        className={`menu-item menu-toggle ${openMenu === 'analytics' ? 'menu-active' : ''} ${activeSection === 'analytics' ? 'active' : ''}`}
                    >
                        <div className="menu-item-label">
                            <img src={StudentsAnalytics} alt="Students Analytics" className="menu-icon" />
                            <span>Аналитика</span>
                        </div>
                    </button>
                    {openMenu === 'analytics' && (
                        <div className="submenu">
                            <div className="indicator-bar">
                                <div className="indicator-active" ref={analyticsIndicatorRef}></div>
                            </div>
                            <div className='submenu-items'>
                                <NavLink to="/student/analytics" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>
                                    Сравнение навыков
                                </NavLink>
                                <NavLink to="/student/suggested" className={({ isActive }) => `submenu-item ${isActive ? 'submenu-item-active' : ''}`}>
                                    Подбор вакансий
                                </NavLink>
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