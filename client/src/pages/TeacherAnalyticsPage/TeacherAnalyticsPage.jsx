import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './TeacherAnalyticsPage.css';
import TeacherProfileMenu from '../../components/ProfileMenu/TeacherProfileMenu';
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Settings from '../../assets/page_info.svg';
import Analytics from '../../assets/analytics.svg';
import ExportModal from '../../components/modals/ExportModal/ExportModal';
import ChartConfigModal from '../../components/ChartConfigModal/ChartConfigModal';
import db from '../../utils/localDb';

const TeacherAnalyticsPage = () => {
    const [chartType, setChartType] = useState('pie');
    const [selectedCourse, setSelectedCourse] = useState('course1');
    const [selectedTest, setSelectedTest] = useState(1);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [currentData, setCurrentData] = useState([]);
    const [analysisType, setAnalysisType] = useState('standard');
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isChartConfigOpen, setIsChartConfigOpen] = useState(false);
    const [chartColor, setChartColor] = useState('standard');
    const [chartScale, setChartScale] = useState(100);

    // Расширенные моковые данные
    const analysisData = {
        standard: {
            course1: { // 3 курс
                1: {
                    name: 'Проверка знаний C# и веб-разработка',
                    data: [
                        { name: 'C#', value: 78, color: '#6A1B9A' },
                        { name: 'ASP.NET', value: 65, color: '#FF7043' },
                        { name: 'React', value: 55, color: '#0288D1' },
                        { name: 'SQL', value: 82, color: '#43A047' },
                    ]
                },
                2: {
                    name: 'Тест по JavaScript и фреймворкам',
                    data: [
                        { name: 'JavaScript', value: 75, color: '#6A1B9A' },
                        { name: 'React', value: 63, color: '#FF7043' },
                        { name: 'Node.js', value: 59, color: '#0288D1' },
                        { name: 'TypeScript', value: 45, color: '#43A047' },
                    ]
                },
                3: {
                    name: 'Базы данных и ORM',
                    data: [
                        { name: 'SQL', value: 85, color: '#6A1B9A' },
                        { name: 'MongoDB', value: 55, color: '#FF7043' },
                        { name: 'Entity Framework', value: 68, color: '#0288D1' },
                        { name: 'PostgreSQL', value: 72, color: '#43A047' },
                    ]
                }
            },
            course2: { // 2 курс
                1: {
                    name: 'Основы программирования',
                    data: [
                        { name: 'C#', value: 65, color: '#6A1B9A' },
                        { name: 'ООП', value: 58, color: '#FF7043' },
                        { name: 'Алгоритмы', value: 72, color: '#0288D1' },
                        { name: 'Структуры данных', value: 63, color: '#43A047' },
                    ]
                },
                2: {
                    name: 'Веб-разработка',
                    data: [
                        { name: 'HTML/CSS', value: 88, color: '#6A1B9A' },
                        { name: 'JavaScript', value: 71, color: '#FF7043' },
                        { name: 'React Основы', value: 52, color: '#0288D1' },
                        { name: 'REST API', value: 45, color: '#43A047' },
                    ]
                },
                3: {
                    name: 'Базы данных',
                    data: [
                        { name: 'SQL Basics', value: 75, color: '#6A1B9A' },
                        { name: 'Нормализация', value: 62, color: '#FF7043' },
                        { name: 'CRUD', value: 81, color: '#0288D1' },
                        { name: 'Индексы', value: 55, color: '#43A047' },
                    ]
                }
            },
            course3: { // 1 курс
                1: {
                    name: 'Введение в программирование',
                    data: [
                        { name: 'Переменные', value: 92, color: '#6A1B9A' },
                        { name: 'Условия', value: 85, color: '#FF7043' },
                        { name: 'Циклы', value: 78, color: '#0288D1' },
                        { name: 'Массивы', value: 71, color: '#43A047' },
                    ]
                },
                2: {
                    name: 'Основы веб-разработки',
                    data: [
                        { name: 'HTML', value: 95, color: '#6A1B9A' },
                        { name: 'CSS', value: 82, color: '#FF7043' },
                        { name: 'JavaScript Основы', value: 68, color: '#0288D1' },
                        { name: 'Git', value: 75, color: '#43A047' },
                    ]
                },
                3: {
                    name: 'Алгоритмы и структуры данных',
                    data: [
                        { name: 'Сортировка', value: 72, color: '#6A1B9A' },
                        { name: 'Поиск', value: 78, color: '#FF7043' },
                        { name: 'Списки', value: 85, color: '#0288D1' },
                        { name: 'Деревья', value: 65, color: '#43A047' },
                    ]
                }
            }
        },
        advanced: {
            course1: {
                1: {
                    name: 'Углубленное изучение C# и веб-разработки',
                    data: [
                        { name: 'C# Advanced', value: 65, color: '#6A1B9A' },
                        { name: 'LINQ', value: 58, color: '#9C27B0' },
                        { name: 'ASP.NET Core', value: 52, color: '#FF7043' },
                        { name: 'React Hooks', value: 48, color: '#FF9800' },
                        { name: 'SQL Optimization', value: 55, color: '#0288D1' },
                        { name: 'Микросервисы', value: 42, color: '#03A9F4' },
                    ]
                },
                2: {
                    name: 'Продвинутый JavaScript',
                    data: [
                        { name: 'ES6+', value: 68, color: '#6A1B9A' },
                        { name: 'TypeScript', value: 55, color: '#9C27B0' },
                        { name: 'React Context', value: 62, color: '#FF7043' },
                        { name: 'Redux', value: 45, color: '#FF9800' },
                        { name: 'Node.js Events', value: 58, color: '#0288D1' },
                        { name: 'Express.js', value: 52, color: '#03A9F4' },
                    ]
                }
            },
            course2: {
                1: {
                    name: 'Продвинутое ООП',
                    data: [
                        { name: 'Наследование', value: 72, color: '#6A1B9A' },
                        { name: 'Полиморфизм', value: 65, color: '#9C27B0' },
                        { name: 'Интерфейсы', value: 58, color: '#FF7043' },
                        { name: 'Абстракция', value: 62, color: '#FF9800' },
                        { name: 'Паттерны', value: 45, color: '#0288D1' },
                        { name: 'SOLID', value: 42, color: '#03A9F4' },
                    ]
                },
                2: {
                    name: 'Архитектура веб-приложений',
                    data: [
                        { name: 'MVC', value: 75, color: '#6A1B9A' },
                        { name: 'REST', value: 68, color: '#9C27B0' },
                        { name: 'GraphQL', value: 52, color: '#FF7043' },
                        { name: 'WebSockets', value: 48, color: '#FF9800' },
                        { name: 'Security', value: 58, color: '#0288D1' },
                        { name: 'Testing', value: 55, color: '#03A9F4' },
                    ]
                }
            },
            course3: {
                1: {
                    name: 'Углубленные алгоритмы',
                    data: [
                        { name: 'Рекурсия', value: 65, color: '#6A1B9A' },
                        { name: 'Динамика', value: 58, color: '#9C27B0' },
                        { name: 'Графы', value: 52, color: '#FF7043' },
                        { name: 'Хеширование', value: 48, color: '#FF9800' },
                        { name: 'Сложность', value: 62, color: '#0288D1' },
                        { name: 'Оптимизация', value: 55, color: '#03A9F4' },
                    ]
                }
            }
        },
        detailed: {
            course1: {
                1: {
                    name: 'Детальный анализ C#',
                    data: [
                        { name: 'Async/Await', value: 58, color: '#6A1B9A' },
                        { name: 'Reflection', value: 45, color: '#9C27B0' },
                        { name: 'Garbage Collection', value: 52, color: '#673AB7' },
                        { name: 'Memory Management', value: 48, color: '#3F51B5' },
                        { name: 'Threading', value: 42, color: '#FF7043' },
                        { name: 'Dependency Injection', value: 55, color: '#FF9800' },
                        { name: 'Middleware', value: 62, color: '#FF5722' },
                        { name: 'Authentication', value: 58, color: '#0288D1' },
                    ]
                }
            },
            course2: {
                1: {
                    name: 'Детальный анализ веб-разработки',
                    data: [
                        { name: 'Browser API', value: 72, color: '#6A1B9A' },
                        { name: 'DOM Events', value: 68, color: '#9C27B0' },
                        { name: 'React Lifecycle', value: 55, color: '#673AB7' },
                        { name: 'Virtual DOM', value: 52, color: '#3F51B5' },
                        { name: 'State Management', value: 48, color: '#FF7043' },
                        { name: 'Performance', value: 45, color: '#FF9800' },
                        { name: 'Security', value: 58, color: '#FF5722' },
                        { name: 'Testing', value: 62, color: '#0288D1' },
                    ]
                }
            }
        }
    };

    const courseOptions = {
        'course1': '3 курс',
        'course2': '2 курс',
        'course3': '1 курс',
    };

    const analysisTypes = {
        'standard': 'Стандартный',
        'advanced': 'Расширенный',
        'detailed': 'Детальный'
    };

    // Mock user data - will be replaced with actual auth context
    const mockUser = {
        userId: 1,
        role: 'teacher',
        name: 'Иван Иванович',
        isAuthenticated: true
    };

    useEffect(() => {
        let filteredData = [];
        const testData = analysisData[analysisType]?.[selectedCourse];
        
        if (testData && testData[selectedTest]) {
            if (selectedLanguage && selectedLanguage !== '') {
                filteredData = testData[selectedTest].data.filter(item => item.name === selectedLanguage) || [];
            } else {
                filteredData = testData[selectedTest].data || [];
            }
        }
        
        setCurrentData(filteredData);
    }, [selectedTest, selectedLanguage, analysisType, selectedCourse]);

    // TODO: Replace with actual database fetching
    const fetchAnalyticsData = async () => {
        try {
            // const analyticsData = await db.getCollection('analytics').find({
            //     analysisType,
            //     testId: selectedTest,
            //     courseId: selectedCourse
            // });
            // setCurrentData(analyticsData);
        } catch (error) {
            console.error('Error fetching analytics data:', error);
        }
    };

    // Redirect if not authenticated or not a teacher
    if (!mockUser.isAuthenticated || mockUser.role !== 'teacher') {
        return <Navigate to="/login" replace />;
    }

    const handleCourseChange = (e) => {
        const newCourse = e.target.value;
        setSelectedCourse(newCourse);
        // Reset test selection when course changes
        const firstTestId = Object.keys(analysisData[analysisType]?.[newCourse] || {})[0] || 1;
        setSelectedTest(firstTestId);
        setSelectedLanguage('');
    };

    const handleTestChange = (e) => {
        setSelectedTest(Number(e.target.value));
        setSelectedLanguage('');
    };

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    const handleAnalysisTypeChange = (e) => {
        const newType = e.target.value;
        setAnalysisType(newType);
        // Reset selections when analysis type changes
        const firstCourse = Object.keys(analysisData[newType] || {})[0] || 'course1';
        setSelectedCourse(firstCourse);
        const firstTestId = Object.keys(analysisData[newType]?.[firstCourse] || {})[0] || 1;
        setSelectedTest(firstTestId);
        setSelectedLanguage('');
    };

    const handleChartTypeChange = (type) => {
        setChartType(type);
    };

    const handleChartColorChange = (color) => {
        setChartColor(color);
    };

    const handleChartScaleChange = (scale) => {
        setChartScale(scale);
    };

    const handleConfigureChart = () => {
        setIsChartConfigOpen(true);
    };

    const handleApplyChartConfig = (config) => {
        setChartType(config.type);
        setChartColor(config.color);
        setChartScale(config.scale);
        setIsChartConfigOpen(false);
    };

    const prepareExportData = () => {
        const testData = analysisData[analysisType]?.[selectedCourse]?.[selectedTest];
        if (!testData) return [];

        const courseInfo = courseOptions[selectedCourse] || '';
        return currentData.map(item => ({
            course: courseInfo,
            test: testData.name,
            language: item.name,
            score: item.value
        }));
    };

    const getAvailableLanguages = () => {
        const testData = analysisData[analysisType]?.[selectedCourse]?.[selectedTest];
        return testData?.data || [];
    };

    const getTestOptions = () => {
        const courseData = analysisData[analysisType]?.[selectedCourse] || {};
        return Object.entries(courseData);
    };

    const handleExport = () => {
        setIsExportModalOpen(true);
    };

    const getChartColor = (index) => {
        const colorSchemes = {
            standard: ['#4284FF', '#FF3B30', '#34C759', '#AF52DE', '#FF9500'],
            blue: ['#1E88E5', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB'],
            purple: ['#7B1FA2', '#9C27B0', '#AB47BC', '#BA68C8', '#CE93D8'],
            orange: ['#F57C00', '#FB8C00', '#FF9800', '#FFA726', '#FFB74D']
        };
        return colorSchemes[chartColor][index % colorSchemes[chartColor].length];
    };

    const getFontSize = (baseSize) => {
        return Math.round(baseSize * chartScale / 100);
    };

    const renderChart = () => {
        if (currentData.length === 0) {
            return (
                <div className="teacher-analytics__no-data">
                    Нет данных для отображения
                </div>
            );
        }

        // Calculate dimensions based on chartScale
        const baseWidth = 900;
        const baseHeight = 500;
        const width = (baseWidth * chartScale) / 100;
        const height = (baseHeight * chartScale) / 100;
        const pieRadius = (160 * chartScale) / 100;

        const commonProps = {
            style: {
                fontSize: getFontSize(14)
            }
        };

        if (chartType === 'pie') {
            return (
                <PieChart width={width} height={height}>
                    <Pie
                        data={currentData}
                        cx={width / 2.5}
                        cy={height / 2}
                        innerRadius={pieRadius / 2}
                        outerRadius={pieRadius}
                        paddingAngle={0}
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}%`}
                        {...commonProps}
                    >
                        {currentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getChartColor(index)} />
                        ))}
                    </Pie>
                    <Legend
                        align="right"
                        verticalAlign="middle"
                        layout="vertical"
                        formatter={(value) => (
                            <span 
                                className="teacher-analytics__legend"
                                style={{ fontSize: getFontSize(14) }}
                            >
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            );
        } else {
            const isHorizontal = chartType === 'horizontal-bar';
            return (
                <BarChart
                    width={width}
                    height={height}
                    data={currentData}
                    layout={isHorizontal ? 'vertical' : 'horizontal'}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    {isHorizontal ? (
                        <>
                            <XAxis type="number" {...commonProps} />
                            <YAxis 
                                type="category" 
                                dataKey="name" 
                                width={150} 
                                {...commonProps}
                            />
                        </>
                    ) : (
                        <>
                            <XAxis dataKey="name" {...commonProps} />
                            <YAxis {...commonProps} />
                        </>
                    )}
                    <Tooltip 
                        contentStyle={{ 
                            fontSize: getFontSize(12),
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            padding: '8px'
                        }} 
                    />
                    <Bar 
                        dataKey="value" 
                        name="Процент студентов"
                        {...(isHorizontal ? { height: 20 * chartScale / 100 } : {})}
                    >
                        {currentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getChartColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            );
        }
    };

    return (
        <div className="teacher-analytics">
            <TeacherProfileMenu />
            <BackgroundProfile>
                <ProfileHeader text="Аналитика студентов" />
                <div className="teacher-analytics__container">
                    <div className="teacher-analytics__top-controls">
                        <div className="teacher-analytics__control-group">
                            <span className="teacher-analytics__control-label">Выберите тип анализа:</span>
                            <div className="teacher-analytics__select-wrapper">
                                <select 
                                    className="teacher-analytics__select"
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
                                    className="teacher-analytics__info-icon-select"
                                />
                            </div>
                        </div>
                        <div className="teacher-analytics__right-section">
                            <div className="teacher-analytics__control-group">
                                <span className="teacher-analytics__control-label">Дополнительно:</span>
                                    <div className="teacher-analytics__actions">
                                    <button 
                                        className="teacher-analytics__action-button"
                                        onClick={handleConfigureChart}
                                    >
                                        Настроить график
                                    </button>
                                    <button 
                                        className="teacher-analytics__action-button"
                                        onClick={handleExport}
                                    >
                                        Экспорт
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="teacher-analytics__parameters">
                        <span className="teacher-analytics__parameters-label">Выберите параметры анализа:</span>
                        <div className="teacher-analytics__parameters-controls">
                            <div className="teacher-analytics__select-wrapper">
                                <select 
                                    className="teacher-analytics__select"
                                    value={selectedCourse} 
                                    onChange={handleCourseChange}
                                >
                                    {Object.entries(courseOptions).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                                <img 
                                    src={Settings} 
                                    alt="info" 
                                    className="teacher-analytics__info-icon-select"
                                />
                            </div>

                            <div className="teacher-analytics__select-wrapper">
                                <select 
                                    className="teacher-analytics__select"
                                    value={selectedTest} 
                                    onChange={handleTestChange}
                                >
                                    {getTestOptions().map(([id, test]) => (
                                        <option key={id} value={id}>{test.name}</option>
                                    ))}
                                </select>
                                <img 
                                    src={Settings} 
                                    alt="info" 
                                    className="teacher-analytics__info-icon-select"
                                />
                            </div>

                            <div className="teacher-analytics__select-wrapper">
                                <select 
                                    className="teacher-analytics__select"
                                    value={selectedLanguage} 
                                    onChange={handleLanguageChange}
                                >
                                    <option value="">Все языки</option>
                                    {getAvailableLanguages().map((item, index) => (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                                <img 
                                    src={Settings} 
                                    alt="info" 
                                    className="teacher-analytics__info-icon-select"
                                />
                            </div>

                            <div className="teacher-analytics__select-wrapper">
                                <select 
                                    className="teacher-analytics__select"
                                    value={chartType} 
                                    onChange={handleChartTypeChange}
                                >
                                    <option value="pie">Круговая диаграмма</option>
                                    <option value="bar">Столбчатая диаграмма</option>
                                    <option value="horizontal-bar">Линейчатая диаграмма</option>
                                </select>
                                <img 
                                    src={Settings} 
                                    alt="info" 
                                    className="teacher-analytics__info-icon-select"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="teacher-analytics__title">График по предоставленному запросу:</div>

                    <div className="teacher-analytics__chart">
                        {renderChart()}
                    </div>
                </div>
            </BackgroundProfile>
            
            <ChartConfigModal 
                isOpen={isChartConfigOpen}
                onClose={() => setIsChartConfigOpen(false)}
                onApply={handleApplyChartConfig}
                initialConfig={{
                    type: chartType,
                    color: chartColor,
                    scale: chartScale
                }}
            />
            <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                data={prepareExportData()}
            />
        </div>
    );
};

export default TeacherAnalyticsPage; 