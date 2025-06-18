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
    const [transitioning, setTransitioning] = useState(false);
    const location = useLocation();
    const testingIndicatorRef = useRef(null);
    const analyticsIndicatorRef = useRef(null);
    const testingSubmenuRef = useRef(null);
    const analyticsSubmenuRef = useRef(null);
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

        requestAnimationFrame(() => {
            const translateY = subsection === 'main' ? '0px' : '42px';
            indicatorRef.current.style.transform = `translateY(${translateY})`;
        });
    };

    // Функция для плавного открытия/закрытия подменю с использованием transform
    const animateSubmenu = (submenuRef, shouldOpen) => {
        if (!submenuRef.current) return Promise.resolve();

        return new Promise((resolve) => {
            const submenu = submenuRef.current;
            
            if (shouldOpen) {
                // Открываем подменю
                submenu.style.transform = 'scaleY(0)';
                submenu.style.opacity = '0';
                submenu.style.transformOrigin = 'top';
                submenu.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease';
                
                requestAnimationFrame(() => {
                    submenu.style.transform = 'scaleY(1)';
                    submenu.style.opacity = '1';
                });
                
                setTimeout(() => {
                    resolve();
                }, 300);
            } else {
                // Закрываем подменю
                submenu.style.transformOrigin = 'top';
                submenu.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease';
                
                requestAnimationFrame(() => {
                    submenu.style.transform = 'scaleY(0)';
                    submenu.style.opacity = '0';
                });
                
                setTimeout(() => {
                    resolve();
                }, 300);
            }
        });
    };

    useEffect(() => {
        const { section, subsection } = getActiveSection(location.pathname);
        
        if (transitioning) return;

        setTransitioning(true);

        const handleMenuTransition = async () => {
            // Определяем, какие подменю должны быть открыты
            const shouldOpenTesting = section === 'testing';
            const shouldOpenAnalytics = section === 'analytics';
            
            // Если нужно изменить состояние подменю
            if (openMenu !== section && (shouldOpenTesting || shouldOpenAnalytics)) {
                // Сначала закрываем текущее открытое подменю, если оно есть
                if (openMenu === 'testing' && !shouldOpenTesting) {
                    await animateSubmenu(testingSubmenuRef, false);
                }
                if (openMenu === 'analytics' && !shouldOpenAnalytics) {
                    await animateSubmenu(analyticsSubmenuRef, false);
                }
                
                // Обновляем состояние
                setOpenMenu(section);
                
                // Ждём следующий кадр для применения состояния
                await new Promise(resolve => requestAnimationFrame(resolve));
                
                // Открываем нужное подменю
                if (shouldOpenTesting) {
                    await animateSubmenu(testingSubmenuRef, true);
                }
                if (shouldOpenAnalytics) {
                    await animateSubmenu(analyticsSubmenuRef, true);
                }
                
                // Обновляем позицию индикатора
                setTimeout(() => {
                    updateIndicatorPosition(section, subsection);
                }, 50);
                
            } else if (openMenu && !shouldOpenTesting && !shouldOpenAnalytics) {
                // Закрываем все подменю если переходим в секцию без подменю
                if (openMenu === 'testing') {
                    await animateSubmenu(testingSubmenuRef, false);
                }
                if (openMenu === 'analytics') {
                    await animateSubmenu(analyticsSubmenuRef, false);
                }
                setOpenMenu(null);
            } else if (openMenu === section) {
                // Если подменю уже открыто, только обновляем индикатор
                updateIndicatorPosition(section, subsection);
            }
            
            setTransitioning(false);
        };

        handleMenuTransition();
    }, [location.pathname]);

    const toggleMenu = async (menu) => {
        if (transitioning) return;
        
        setTransitioning(true);
        
        const newOpenState = openMenu === menu ? null : menu;
        const submenuRef = menu === 'testing' ? testingSubmenuRef : analyticsSubmenuRef;
        
        if (openMenu === menu) {
            // Закрываем подменю
            await animateSubmenu(submenuRef, false);
            setOpenMenu(null);
        } else {
            // Сначала закрываем текущее подменю, если оно открыто
            if (openMenu === 'testing' && menu !== 'testing') {
                await animateSubmenu(testingSubmenuRef, false);
            }
            if (openMenu === 'analytics' && menu !== 'analytics') {
                await animateSubmenu(analyticsSubmenuRef, false);
            }
            
            // Открываем новое подменю
            setOpenMenu(newOpenState);
            await new Promise(resolve => requestAnimationFrame(resolve));
            await animateSubmenu(submenuRef, true);
            
            // Обновляем индикатор, если мы в соответствующей секции
            const { section, subsection } = getActiveSection(location.pathname);
            if (section === newOpenState) {
                setTimeout(() => {
                    updateIndicatorPosition(section, subsection);
                }, 50);
            }
        }
        
        setTransitioning(false);
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
                        disabled={transitioning}
                    >
                        <div className="menu-item-label">
                            <img src={StudentsTesting} alt="Student testing" className="menu-icon" />
                            <span>Тестирование</span>
                        </div>
                    </button>
                    <div 
                        ref={testingSubmenuRef}
                        className={`submenu ${openMenu === 'testing' ? 'submenu-open' : 'submenu-closed'}`}
                        style={{ 
                            transform: openMenu === 'testing' ? 'scaleY(1)' : 'scaleY(0)', 
                            opacity: openMenu === 'testing' ? '1' : '0',
                            transformOrigin: 'top'
                        }}
                    >
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
                </div>
                
                <div>
                    <button 
                        onClick={() => toggleMenu('analytics')} 
                        className={`menu-item menu-toggle ${openMenu === 'analytics' ? 'menu-active' : ''} ${activeSection === 'analytics' ? 'active' : ''}`}
                        disabled={transitioning}
                    >
                        <div className="menu-item-label">
                            <img src={StudentsAnalytics} alt="Students Analytics" className="menu-icon" />
                            <span>Аналитика</span>
                        </div>
                    </button>
                    <div 
                        ref={analyticsSubmenuRef}
                        className={`submenu ${openMenu === 'analytics' ? 'submenu-open' : 'submenu-closed'}`}
                        style={{ 
                            transform: openMenu === 'analytics' ? 'scaleY(1)' : 'scaleY(0)', 
                            opacity: openMenu === 'analytics' ? '1' : '0',
                            transformOrigin: 'top'
                        }}
                    >
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