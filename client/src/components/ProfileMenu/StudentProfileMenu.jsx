import React, { useState } from 'react';
import './ProfileMenu.css';
import lOGO from '../../assets/lOGO.svg';
import UserProfileCard from './UserProfileCard';
import ProfileHome from '../../assets/person.svg'
import StudentsTesting from '../../assets/person_raised_hand.svg'
import StudentsAnalytics from '../../assets/insert_chart.svg'
import SavedVacancies from '../../assets/bookmarks.svg'
import LookForJob from '../../assets/work.svg'

const StudentProfileMenu = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const [activeSubItem, setActiveSubItem] = useState({
        testing: 'Прохождение теста',
        analytics: 'Подбор вакансий'
    });

    const toggleMenu = (menu) => {
        setActiveItem(menu);
        if (openMenu === menu) {
            setOpenMenu(null);
        } else {
            setOpenMenu(menu);
        }
    };

    const handleMenuItemClick = (item) => {
        setActiveItem(item);
        // Close any open submenus if clicking a non-collapsible item
        if (item !== 'testing' && item !== 'analytics') {
            setOpenMenu(null);
        }
    };

    const handleSubItemClick = (menu, item) => {
        setActiveSubItem({
            ...activeSubItem,
            [menu]: item
        });
    };

    return (
        <div className="sidebar">
            {/* Logo Section */}
            <div className="logo-section">
                <img src={lOGO} alt="Logo" className="logo" />
            </div>

            {/* User Profile Card */}
            <UserProfileCard />

            {/* Menu Items */}
            <div className="menu-container">
                <button
                    className={`menu-item ${activeItem === 'profile' ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick('profile')}
                >
                    <div className="menu-item-label">
                        <img src={ProfileHome} alt="Profile home" className="menu-icon" />
                        <span>Профиль</span>
                    </div>
                    <svg className="menu-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </svg>
                </button>

                {/* Тестирование - Collapsible Menu */}
                <div>
                    <button
                        onClick={() => toggleMenu('testing')}
                        className={`menu-item menu-toggle ${openMenu === 'testing' ? 'menu-active' : ''} ${activeItem === 'testing' ? 'active' : ''}`}
                    >
                        <div className="menu-item-label">
                        <img src={StudentsTesting} alt="Student testing" className="menu-icon" />
                            <span>Тестирование</span>
                        </div>
                        <svg className="menu-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg>
                    </button>

                    {/* Submenu for Тестирование */}
                    {openMenu === 'testing' && (
                        <div className="submenu">
                            {/* Indicator bar */}
                            <div className="indicator-bar">
                                <div
                                    className="indicator-active"
                                    style={{
                                        transform: `translateY(${activeSubItem.testing === 'Прохождение теста' ? '0' : '42px'})`
                                    }}
                                ></div>
                            </div>

                            <div className='submenu-items'>
                                <button
                                    onClick={() => handleSubItemClick('testing', 'Прохождение теста')}
                                    className={`submenu-item ${activeSubItem.testing === 'Прохождение теста' ? 'submenu-item-active' : ''}`}
                                >
                                    Прохождение теста
                                </button>
                                <button
                                    onClick={() => handleSubItemClick('testing', 'История прохождений')}
                                    className={`submenu-item ${activeSubItem.testing === 'История прохождений' ? 'submenu-item-active' : ''}`}
                                >
                                    История прохождений
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Аналитика - Collapsible Menu */}
                <div>
                    <button
                        onClick={() => toggleMenu('analytics')}
                        className={`menu-item menu-toggle ${openMenu === 'analytics' ? 'menu-active' : ''} ${activeItem === 'analytics' ? 'active' : ''}`}
                    >
                        <div className="menu-item-label">
                        <img src={StudentsAnalytics} alt="Students Analytics" className="menu-icon" />
                            <span>Аналитика</span>
                        </div>
                        <svg className="menu-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg>
                    </button>

                    {/* Submenu for Аналитика */}
                    {openMenu === 'analytics' && (
                        <div className="submenu">
                            {/* Indicator bar */}
                            <div className="indicator-bar">
                                <div
                                    className="indicator-active"
                                    style={{
                                        transform: `translateY(${activeSubItem.analytics === 'Подбор вакансий' ? '42px' : '0'})`
                                    }}
                                ></div>
                            </div>

                            <div className='submenu-items'>
                                <button
                                    onClick={() => handleSubItemClick('analytics', 'Сравнение навыков')}
                                    className={`submenu-item ${activeSubItem.analytics === 'Сравнение навыков' ? 'submenu-item-active' : ''}`}
                                >
                                    Сравнение навыков
                                </button>
                                <button
                                    onClick={() => handleSubItemClick('analytics', 'Подбор вакансий')}
                                    className={`submenu-item ${activeSubItem.analytics === 'Подбор вакансий' ? 'submenu-item-active' : ''}`}
                                >
                                    Подбор вакансий
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    className={`menu-item ${activeItem === 'saved' ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick('saved')}
                >
                    <div className="menu-item-label">
                    <img src={SavedVacancies} alt="Saved Vacancies" className="menu-icon" />
                        <span>Сохранённые</span>
                    </div>
                    <svg className="menu-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </svg>
                </button>

                <div className="menu-divider"></div>

                <button
                    className={`menu-item ${activeItem === 'job-search' ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick('job-search')}
                >
                    <div className="menu-item-label">
                    <img src={LookForJob} alt="Look for job" className="menu-icon" />
                        <span>Поиск работы</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default StudentProfileMenu;