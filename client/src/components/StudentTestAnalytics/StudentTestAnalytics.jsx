import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useParams } from 'react-router-dom';
import './StudentTestAnalytics.css';
import Analytics from '../../assets/analytics.svg';
import Settings from '../../assets/page_info.svg';

const StudentTestAnalytics = () => {
  const { testId } = useParams(); // Получаем testId из URL

  // Моковые данные для разных типов тестов с уникальными id
  const testData = {
    1: { 
      name: 'Проверка знаний',
      data: [
        { name: 'C#', value: 81, color: '#6A1B9A' },
        { name: 'DB', value: 75, color: '#FF7043' },
        { name: 'React', value: 46, color: '#0288D1' },
      ]
    },
    2: { 
      name: 'Тест по JavaScript',
      data: [
        { name: 'JavaScript', value: 25, color: '#6A1B9A' },
        { name: 'React', value: 43, color: '#FF7043' },
        { name: 'Node.js', value: 19, color: '#0288D1' },
      ]
    }
  };

  // Моковые данные для разных курсов по каждому тесту
  const courseData = {
    1: {
      availableCourses: ['course1', 'course2', 'course3'], // доступные курсы для теста 1
      'course1': [
        { name: 'C#', value: 30, color: '#9D80F9' },
        { name: 'DB', value: 10, color: '#FF9C9C' },
        { name: 'React', value: 6, color: '#4DD0E1' },
      ],
      'course2': [
        { name: 'C#', value: 65, color: '#FFCA28' },
        { name: 'DB', value: 46, color: '#66BB6A' },
        { name: 'React', value: 13, color: '#42A5F5' },
      ],
      'course3': [
        { name: 'C#', value: 72, color: '#EF5350' },
        { name: 'DB', value: 68, color: '#AB47BC' },
        { name: 'React', value: 43, color: '#26A69A' },
      ],
    },
    2: {
      availableCourses: ['course2', 'course3'], // доступные курсы для теста 2
      'course2': [
        { name: 'JavaScript', value: 17, color: '#FFCA28' },
        { name: 'React', value: 8, color: '#66BB6A' },
        { name: 'Node.js', value: 9, color: '#42A5F5' },
      ],
      'course3': [
        { name: 'JavaScript', value: 31, color: '#EF5350' },
        { name: 'React', value: 38, color: '#AB47BC' },
        { name: 'Node.js', value: 23, color: '#26A69A' },
      ],
      // course1 не доступен для теста 2
    }
  };

  // Массив истории прохождения тестов
  const testHistory = [
    {
      id: 1,
      teacher: 'Сергиенко О.В.',
      testName: 'Проверка знаний',
      date: '29.04.2024',
      description: 'Оцените свои знания и укажите, какой предмет оказал наибольшее влияние на получение этих знаний'
    },
    {
      id: 2,
      teacher: 'Иванов И.И.',
      testName: 'Тест по JavaScript',
      date: '12.03.2024',
      description: 'Пройдите тест, чтобы оценить ваши знания в области JavaScript и веб-разработки'
    }
  ];

  const courseOptions = {
    'myStats': 'Моя статистика',
    'course1': 'Курс 1',
    'course2': 'Курс 2',
    'course3': 'Курс 3',
  };

  const [chartType, setChartType] = useState('pie');
  const [selectedCourse, setSelectedCourse] = useState('myStats');
  const [selectedTest, setSelectedTest] = useState(Number(testId) || 1); // Используем testId из URL
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [currentData, setCurrentData] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  
  const [displayCourse, setDisplayCourse] = useState(courseOptions['myStats']);
  const [displayTest, setDisplayTest] = useState(testData[selectedTest]?.name || 'Неизвестный тест');
  const [displayLanguage, setDisplayLanguage] = useState('Все языки');
  const [displayChartType, setDisplayChartType] = useState('Круговая диаграмма');

  // Функция для получения доступных опций курса (всегда включает "Моя статистика")
  const getAvailableCourseOptions = () => {
    const availableCourses = courseData[selectedTest]?.availableCourses || [];
    return ['myStats', ...availableCourses];
  };

  useEffect(() => {
    const languages = testData[selectedTest]?.data.map(item => item.name) || [];
    setAvailableLanguages(languages);
    
    let filteredData;

    // Если выбран конкретный язык программирования, показываем данные по всем доступным курсам + моя статистика
    if (selectedLanguage && selectedLanguage !== '') {
      filteredData = [];
      
      // Добавляем данные из "Моя статистика"
      const myStatsData = testData[selectedTest]?.data.find(item => item.name === selectedLanguage);
      if (myStatsData) {
        filteredData.push({
          ...myStatsData,
          name: `${selectedLanguage} (Моя статистика)`
        });
      }
      
      // Добавляем данные из всех доступных курсов
      const availableCourses = courseData[selectedTest]?.availableCourses || [];
      availableCourses.forEach(course => {
        const courseData_item = courseData[selectedTest]?.[course]?.find(item => item.name === selectedLanguage);
        if (courseData_item) {
          filteredData.push({
            ...courseData_item,
            name: `${selectedLanguage} (${courseOptions[course]})`
          });
        }
      });
    } else {
      // Если язык не выбран, показываем данные как раньше
      if (selectedCourse === 'myStats') {
        filteredData = testData[selectedTest]?.data || [];
      } else {
        filteredData = courseData[selectedTest]?.[selectedCourse] || [];
      }
    }

    setCurrentData(filteredData);
  }, [selectedTest, selectedCourse, selectedLanguage]);

  const handleCourseChange = (e) => {
    const newCourse = e.target.value;
    setSelectedCourse(newCourse);
    setDisplayCourse(courseOptions[newCourse]);
  };

  const handleTestChange = (e) => {
    const newSelectedTest = Number(e.target.value);
    setSelectedTest(newSelectedTest);
    setSelectedLanguage('');
    
    // Проверяем, доступен ли текущий выбранный курс для нового теста
    const availableCoursesForNewTest = getAvailableCourseOptions();
    if (!availableCoursesForNewTest.includes(selectedCourse)) {
      // Если текущий курс недоступен, сбрасываем на "Моя статистика"
      setSelectedCourse('myStats');
      setDisplayCourse(courseOptions['myStats']);
    }
    
    setDisplayTest(testData[newSelectedTest]?.name || 'Неизвестный тест');
    setDisplayLanguage('Все языки');
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setDisplayLanguage(newLanguage === '' ? 'Все языки' : newLanguage);
  };

  const handleChartTypeChange = (e) => {
    const newChartType = e.target.value;
    setChartType(newChartType);
    setDisplayChartType(newChartType === 'pie' ? 'Круговая диаграмма' : 'Столбчатая диаграмма');
  };

  const renderChart = () => {
    if (chartType === 'pie') {
      return (
        <PieChart width={500} height={400}>
          <Pie
            data={currentData}
            cx={250}
            cy={200}
            innerRadius={70}
            outerRadius={140}
            paddingAngle={0}
            dataKey="value"
            label={({ name, value }) => `${name} ${value}`}
          >
            {currentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend 
            align="right" 
            verticalAlign="middle" 
            layout="vertical"
            formatter={(value) => <span style={{ color: '#333', fontSize: '14px' }}>{value}</span>}
          />
        </PieChart>
      );
    } else if (chartType === 'bar') {
      return (
        <BarChart
          width={500}
          height={400}
          data={currentData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value">
            {currentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="filters-container">
        <div className="filter-group">
          <button className="filter-button">
            <img className="filter-icon" src={Settings} alt="Settings" />
            <span>{displayCourse}</span>
            <select value={selectedCourse} onChange={handleCourseChange}>
              {getAvailableCourseOptions().map((value) => (
                <option key={value} value={value}>{courseOptions[value]}</option>
              ))}
            </select>
          </button>
        </div>

        <div className="filter-group">
          <button className="filter-button">
            <img className="filter-icon" src={Settings} alt="Settings" />
            <span>{displayTest}</span>
            <select value={selectedTest} onChange={handleTestChange}>
              {Object.keys(testData).map((testId) => (
                <option key={testId} value={testId}>{testData[testId]?.name}</option>
              ))}
            </select>
          </button>
        </div>

        <div className="filter-group">
          <button className="filter-button">
            <img className="filter-icon" src={Settings} alt="Settings" />
            <span>{displayLanguage}</span>
            <select value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="">Все языки</option>
              {availableLanguages.map((lang, index) => (
                <option key={index} value={lang}>{lang}</option>
              ))}
            </select>
          </button>
        </div>

        <div className="filter-group">
          <button className="filter-button">
            <img className="filter-icon" src={Analytics} alt="Analytics" />
            <span>{displayChartType}</span>
            <select value={chartType} onChange={handleChartTypeChange}>
              <option value="pie">Круговая диаграмма</option>
              <option value="bar">Столбчатая диаграмма</option>
            </select>
          </button>
        </div>
      </div>

      <div className="dashboard-title">Результаты тестирования:</div>

      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default StudentTestAnalytics;