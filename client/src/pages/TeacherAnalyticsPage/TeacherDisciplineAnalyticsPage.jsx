import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './TeacherDisciplineAnalyticsPage.css';
import TeacherProfileMenu from '../../components/ProfileMenu/TeacherProfileMenu';
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import Settings from '../../assets/page_info.svg';
import ExportModal from '../../components/modals/ExportModal/ExportModal';
import { disciplineAnalyticsData, disciplineAnalysisParams, analysisTypes } from '../../utils/analyticsMockData';

const TeacherDisciplineAnalyticsPage = () => {
    const [analysisType, setAnalysisType] = useState('standard');
    const [selectedCategory, setSelectedCategory] = useState('programming');
    const [selectedTest, setSelectedTest] = useState('test1');
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [summary, setSummary] = useState(null);

    // Mock user data
    const mockUser = {
        userId: 1,
        role: 'teacher',
        name: 'Иван Иванович',
        isAuthenticated: true
    };

    useEffect(() => {
        // Обновляем данные при изменении параметров
        const data = disciplineAnalyticsData[analysisType]?.[selectedCategory] || {};
        const { summary: dataSummary, ...restData } = data;
        setCurrentData(restData);
        setSummary(dataSummary);
    }, [analysisType, selectedCategory, selectedTest, selectedPeriod]);

    // Redirect if not authenticated or not a teacher
    if (!mockUser.isAuthenticated || mockUser.role !== 'teacher') {
        return <Navigate to="/login" replace />;
    }

    const handleAnalysisTypeChange = (e) => {
        setAnalysisType(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleTestChange = (e) => {
        setSelectedTest(e.target.value);
    };

    const handlePeriodChange = (e) => {
        setSelectedPeriod(e.target.value);
    };

    const handleExport = () => {
        setIsExportModalOpen(true);
    };

    const renderSummary = () => {
        if (!summary) return null;

        return (
            <div className="teacher-discipline-analytics__summary">
                <div className="teacher-discipline-analytics__summary-title">
                    Общая статистика
                </div>
                <div className="teacher-discipline-analytics__summary-stats">
                    <div className="teacher-discipline-analytics__summary-stat">
                        <div className="teacher-discipline-analytics__summary-label">Всего студентов</div>
                        <div className="teacher-discipline-analytics__summary-value">{summary.totalStudents}</div>
                    </div>
                    <div className="teacher-discipline-analytics__summary-stat">
                        <div className="teacher-discipline-analytics__summary-label">Средний балл</div>
                        <div className="teacher-discipline-analytics__summary-value">{summary.averageScore}</div>
                    </div>
                    <div className="teacher-discipline-analytics__summary-stat">
                        <div className="teacher-discipline-analytics__summary-label">Завершенных тестов</div>
                        <div className="teacher-discipline-analytics__summary-value">{summary.completedTests}</div>
                    </div>
                </div>
            </div>
        );
    };

    const renderStatBoxes = () => {
        if (!currentData || Object.keys(currentData).length === 0) {
            return (
                <div className="teacher-discipline-analytics__no-data">
                    Нет данных для выбранных параметров
                </div>
            );
        }

        return Object.entries(currentData).map(([name, data], index) => (
            <div key={index} className="teacher-discipline-analytics__stat-box">
                <div className="teacher-discipline-analytics__stat-title">
                    {name}
                </div>
                <div className="teacher-discipline-analytics__stat-subtitle">
                    <span>Количество: {data.count}</span>
                    {data.averageScore && (
                        <span>Средний балл: {data.averageScore}</span>
                    )}
                </div>
                <div className="teacher-discipline-analytics__stat-details">
                    {data.technologies && (
                        <>
                            <div className="teacher-discipline-analytics__stat-section-title">
                                Технологии:
                            </div>
                            {Object.entries(data.technologies).map(([tech, count], i) => (
                                <div key={i} className="teacher-discipline-analytics__stat-row">
                                    <span>{tech}</span>
                                    <span>{count}</span>
                                </div>
                            ))}
                        </>
                    )}
                    {data.comparison && (
                        <>
                            <div className="teacher-discipline-analytics__stat-section-title">
                                Распределение:
                            </div>
                            {Object.entries(data.comparison).map(([category, count], i) => (
                                <div key={i} className="teacher-discipline-analytics__stat-row">
                                    <span>{category}</span>
                                    <span>{count}</span>
                                </div>
                            ))}
                        </>
                    )}
                    {data.trends && (
                        <>
                            <div className="teacher-discipline-analytics__stat-section-title">
                                Тренды:
                            </div>
                            {Object.entries(data.trends).map(([trend, value], i) => (
                                <div key={i} className="teacher-discipline-analytics__stat-row">
                                    <span>{trend}</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        ));
    };

    return (
        <div className="teacher-discipline-analytics">
            <TeacherProfileMenu />
            <BackgroundProfile>
                <ProfileHeader text="Аналитика учебных дисциплин" />
                <div className="teacher-discipline-analytics__container">
                    <div className="teacher-discipline-analytics__top-controls">
                        <div className="teacher-discipline-analytics__control-group">
                            <span className="teacher-discipline-analytics__control-label">Выберите тип анализа:</span>
                            <div className="teacher-discipline-analytics__select-wrapper">
                                <select 
                                    className="teacher-discipline-analytics__select"
                                    value={analysisType}
                                    onChange={handleAnalysisTypeChange}
                                >
                                    {Object.entries(analysisTypes).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                                <img 
                                    src={Settings} 
                                    alt="info" 
                                    className="teacher-discipline-analytics__info-icon-select"
                                />
                            </div>
                        </div>
                        <div className="teacher-discipline-analytics__right-section">
                            <div className="teacher-discipline-analytics__control-group">
                                <span className="teacher-discipline-analytics__control-label">Дополнительно:</span>
                                <div className="teacher-discipline-analytics__actions">
                                    <button 
                                        className="teacher-discipline-analytics__action-button"
                                        onClick={handleExport}
                                    >
                                        Экспорт
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="teacher-discipline-analytics__parameters">
                        <span className="teacher-discipline-analytics__parameters-label">Выберите параметры анализа:</span>
                        <div className="teacher-discipline-analytics__parameters-controls">
                            <div className="teacher-discipline-analytics__select-wrapper">
                                <select 
                                    className="teacher-discipline-analytics__select"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    {disciplineAnalysisParams.categories.map(category => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                                <img 
                                    src={Settings} 
                                    alt="info" 
                                    className="teacher-discipline-analytics__info-icon-select"
                                />
                            </div>

                            <div className="teacher-discipline-analytics__select-wrapper">
                                <select 
                                    className="teacher-discipline-analytics__select"
                                    value={selectedTest}
                                    onChange={handleTestChange}
                                >
                                    {disciplineAnalysisParams.tests.map(test => (
                                        <option key={test.value} value={test.value}>
                                            {test.label}
                                        </option>
                                    ))}
                                </select>
                                <img 
                                    src={Settings} 
                                    alt="info" 
                                    className="teacher-discipline-analytics__info-icon-select"
                                />
                            </div>

                            <div className="teacher-discipline-analytics__select-wrapper">
                                <select 
                                    className="teacher-discipline-analytics__select"
                                    value={selectedPeriod}
                                    onChange={handlePeriodChange}
                                >
                                    {disciplineAnalysisParams.periods.map(period => (
                                        <option key={period.value} value={period.value}>
                                            {period.label}
                                        </option>
                                    ))}
                                </select>
                                <img 
                                    src={Settings} 
                                    alt="info" 
                                    className="teacher-discipline-analytics__info-icon-select"
                                />
                            </div>
                        </div>
                    </div>

                    {renderSummary()}

                    <div className="teacher-discipline-analytics__content">
                        <div className="teacher-discipline-analytics__title">
                            Статистика по предоставленному запросу:
                        </div>

                        <div className="teacher-discipline-analytics__stats">
                            {renderStatBoxes()}
                        </div>
                    </div>
                </div>
            </BackgroundProfile>

            <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                data={[]}
            />
        </div>
    );
};

export default TeacherDisciplineAnalyticsPage; 