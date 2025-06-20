import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChevronDown, FileText, Settings, TrendingUp, Users, Clock, Award } from 'lucide-react';
import TeacherProfileMenu from '../../components/ProfileMenu/TeacherProfileMenu';
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import ExportModal from '../../components/modals/ExportModal/ExportModal';

/**
 * DisciplineAnalytics — компонент аналитики учебных дисциплин
 */
const DisciplineAnalytics = () => {
  // Состояния
  const [selectedWay, setSelectedWay] = useState('');
  const [analysisType, setAnalysisType] = useState('standard');
  const [selectedCategory, setSelectedCategory] = useState('csharp');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedTest, setSelectedTest] = useState('basic_concepts');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // --- Способы обучения ---
  const waysOfLearning = useMemo(() => [
    { id: uuidv4(), name: 'Программирование' },
    { id: uuidv4(), name: 'Веб-разработка' },
    { id: uuidv4(), name: 'Базы данных' },
    { id: uuidv4(), name: 'Алгоритмы и структуры данных' },
    { id: uuidv4(), name: 'Объектно-ориентированное программирование' },
    { id: uuidv4(), name: 'Самостоятельное обучение' },
  ], []);

  // --- Категории и подкатегории (связанные с существующими данными) ---
  const categoryIds = [uuidv4(), uuidv4(), uuidv4(), uuidv4()];
  
  const CATEGORIES = [
    { id: categoryIds[0], name: 'C#', value: 'csharp' },
    { id: categoryIds[1], name: 'Базы данных', value: 'databases' },
    { id: categoryIds[2], name: 'Web-разработка', value: 'webdev' },
    { id: categoryIds[3], name: 'React', value: 'react' }
  ];

  const SUBCATEGORIES = {
    csharp: [
      { name: 'ASP.Net' },
      { name: 'EntityFramework' },
      { name: 'RazorPages' },
      { name: 'OOP' }
    ],
    databases: [
      { name: 'SQL' },
      { name: 'NoSQL' },
      { name: 'ORM' }
    ],
    webdev: [
      { name: 'Frontend' },
      { name: 'Backend' },
      { name: 'Full-stack' }
    ],
    react: [
      { name: 'Hooks' },
    ]
  };

  // --- Список тестов ---
  const tests = [
    { value: 'basic_concepts', label: 'Основы и концепции' },
    { value: 'practical_tasks', label: 'Практические задания' },
    { value: 'project_work', label: 'Проектная работа' },
    { value: 'theory_test', label: 'Теоретический тест' },
    { value: 'midterm', label: 'Промежуточная аттестация' },
    { value: 'final_exam', label: 'Итоговый экзамен' },
  ];

  // --- Типы анализа ---
  const analysisTypes = {
    standard: 'Стандартный',
    detailed: 'Детальный'
  };

  // --- Функция генерации статичных данных ---
  const generateStaticMockData = () => {
    const makeStats = (baseTotal = 28) => {
      const totalStudents = baseTotal;
      const completedTests = Math.floor(totalStudents * (0.6 + Math.random() * 0.35));
      const averageScore = Math.floor(55 + Math.random() * 40);
      return { totalStudents, completedTests, averageScore };
    };

    const makeDetailedStats = (subjectName, baseTotal = 28) => {
      const totalStudents = baseTotal;
      const completedTests = Math.floor(totalStudents * (0.6 + Math.random() * 0.35));
      const averageScore = Math.floor(55 + Math.random() * 40);
      
      // Технологии для каждого предмета
      const techMappings = {
        'ASP.Net': ['MVC', 'Web API', 'SignalR', 'Identity', 'Middleware'],
        'EntityFramework': ['Code First', 'Database First', 'Migrations', 'LINQ', 'Fluent API'],
        'RazorPages': ['Page Model', 'Tag Helpers', 'Partial Views', 'Layouts', 'Validation'],
        'OOP': ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'Interfaces'],
        'SQL': ['SELECT', 'JOIN', 'Stored Procedures', 'Triggers', 'Indexes'],
        'NoSQL': ['MongoDB', 'Redis', 'Cassandra', 'Neo4j', 'Document Store'],
        'ORM': ['Entity Framework', 'Dapper', 'NHibernate', 'Linq2Db', 'ADO.NET'],
        'Frontend': ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Webpack'],
        'Backend': ['Node.js', 'Express', 'REST API', 'GraphQL', 'Authentication'],
        'Full-stack': ['MEAN', 'MERN', 'JAMstack', 'Serverless', 'Microservices'],
        'Hooks': ['useState', 'useEffect', 'useContext', 'useReducer', 'Custom Hooks'],
      };

      const techList = techMappings[subjectName] || [`${subjectName} Tech1`, `${subjectName} Tech2`, `${subjectName} Tech3`];
      const technologies = {};
      techList.forEach(tech => {
        technologies[tech] = Math.floor(Math.random() * (totalStudents + 1));
      });

      const difficulty = {
        'Легкие задачи': Math.floor(Math.random() * totalStudents),
        'Средние задачи': Math.floor(Math.random() * totalStudents),
        'Сложные задачи': Math.floor(Math.random() * totalStudents),
      };

      const timeSpent = {
        'Менее 30 мин': Math.floor(Math.random() * totalStudents),
        '30-60 мин': Math.floor(Math.random() * totalStudents),
        'Более 60 мин': Math.floor(Math.random() * totalStudents),
      };

      const testTypes = {
        'Теоретические': Math.floor(Math.random() * totalStudents),
        'Практические': Math.floor(Math.random() * totalStudents),
        'Проектные': Math.floor(Math.random() * totalStudents),
      };

      return { totalStudents, completedTests, averageScore, technologies, difficulty, timeSpent, testTypes };
    };

    const result = {};
    Object.keys(analysisTypes).forEach(atype => {
      result[atype] = {};
      tests.forEach(test => {
        result[atype][test.value] = {};
        Object.keys(SUBCATEGORIES).forEach(catKey => {
          result[atype][test.value][catKey] = {};
          const subjects = SUBCATEGORIES[catKey] || [];
          subjects.forEach(subject => {
            const subjectName = subject.name;
            if (atype === 'standard') {
              const base = makeStats(28);
              const techMappings = {
                'ASP.Net': ['MVC', 'Web API', 'SignalR', 'Identity', 'Middleware'],
                'EntityFramework': ['Code First', 'Database First', 'Migrations', 'LINQ', 'Fluent API'],
                'RazorPages': ['Page Model', 'Tag Helpers', 'Partial Views', 'Layouts', 'Validation'],
                'OOP': ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'Interfaces'],
                'SQL': ['SELECT', 'JOIN', 'Stored Procedures', 'Triggers', 'Indexes'],
                'NoSQL': ['MongoDB', 'Redis', 'Cassandra', 'Neo4j', 'Document Store'],
                'ORM': ['Entity Framework', 'Dapper', 'NHibernate', 'Linq2Db', 'ADO.NET'],
                'Frontend': ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Webpack'],
                'Backend': ['Node.js', 'Express', 'REST API', 'GraphQL', 'Authentication'],
                'Full-stack': ['MEAN', 'MERN', 'JAMstack', 'Serverless', 'Microservices'],
                'Hooks': ['useState', 'useEffect', 'useContext', 'useReducer', 'Custom Hooks'],
              };
              const techList = techMappings[subjectName] || [`${subjectName} Core`, `${subjectName} Lib`, `${subjectName} Tool`];
              const technologies = {};
              techList.forEach(tech => {
                technologies[tech] = Math.floor(Math.random() * (base.totalStudents + 1));
              });
              result[atype][test.value][catKey][subjectName] = {
                totalStudents: base.totalStudents,
                completedTests: base.completedTests,
                averageScore: base.averageScore,
                technologies,
              };
            } else {
              result[atype][test.value][catKey][subjectName] = makeDetailedStats(subjectName, 28);
            }
          });
        });
      });
    });
    return result;
  };

  // --- Статичные данные ---
  const [mockData] = useState(() => generateStaticMockData());

  // --- Извлечение текущих данных ---
  const currentCatData = useMemo(() => {
    const dataByTest = mockData[analysisType]?.[selectedTest] || {};
    const catData = dataByTest[selectedCategory] || {};
    if (selectedSubcategory && selectedSubcategory !== 'all') {
      if (catData[selectedSubcategory]) {
        return { [selectedSubcategory]: catData[selectedSubcategory] };
      }
      return {};
    }
    return catData;
  }, [mockData, analysisType, selectedTest, selectedCategory, selectedSubcategory]);

  // --- Утилиты для цветов и процентов ---
  const getScoreColor = (score) => {
    if (score >= 75) return '#16a34a';
    if (score >= 60) return '#d97706';
    return '#b91c1c';
  };

  const getCompletionColor = (completed, total) => {
    const pct = total > 0 ? (completed / total) * 100 : 0;
    if (pct >= 80) return '#16a34a';
    if (pct >= 60) return '#d97706';
    return '#b91c1c';
  };

  const getCompletionPercentage = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  // --- Общая статистика ---
  const overallStats = useMemo(() => {
    const subjects = Object.values(currentCatData);
    if (subjects.length === 0) return null;
    const totalStudents = subjects[0]?.totalStudents || 0;
    const avgCompletion = subjects.reduce((sum, s) => sum + s.completedTests, 0) / subjects.length;
    const avgScore = subjects.reduce((sum, s) => sum + s.averageScore, 0) / subjects.length;
    return {
      totalStudents,
      avgCompletion: Math.round(avgCompletion),
      avgScore: Math.round(avgScore),
      subjectsCount: subjects.length,
    };
  }, [currentCatData]);

  // --- Стили ---
  const styles = {
    container: {
      maxWidth: '1120px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh',
      boxSizing: 'border-box',
    },
    panel: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '24px',
    },
    flexBetween: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    controlsRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      alignItems: 'flex-end',
    },
    controlGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '0',
    },
    select: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '8px 32px 8px 12px',
      fontSize: '14px',
    },
    buttonExport: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    statsGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
    },
    statCard: {
      flex: '1 1 calc(25% - 16px)',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      minWidth: '120px',
      boxSizing: 'border-box',
    },
    statIconLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '700',
      marginTop: '4px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '16px',
    },
    cardsGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
    },
    card: {
      flex: '1 1 calc(33.333% - 16px)',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minWidth: '200px',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    badge: (score) => {
      let bg, color;
      if (score >= 75) {
        bg = '#d1fae5'; color = '#065f46';
      } else if (score >= 60) {
        bg = '#fef3c7'; color = '#92400e';
      } else {
        bg = '#fee2e2'; color = '#991b1b';
      }
      return {
        backgroundColor: bg,
        color: color,
        borderRadius: '9999px',
        padding: '2px 8px',
        fontSize: '12px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
      };
    },
    progressContainer: {
      marginBottom: '12px',
    },
    progressLabelRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      marginBottom: '4px',
    },
    progressBarBackground: {
      width: '100%',
      backgroundColor: '#e5e7eb',
      borderRadius: '9999px',
      height: '8px',
      overflow: 'hidden',
    },
    progressBarFill: (pct) => {
      let bg;
      if (pct >= 80) bg = '#10b981';
      else if (pct >= 60) bg = '#f59e0b';
      else bg = '#ef4444';
      return {
        width: `${pct}%`,
        backgroundColor: bg,
        height: '100%',
        transition: 'width 0.3s ease',
      };
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      marginBottom: '4px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '32px',
      color: '#6b7280',
    },
    emptyIcon: {
      width: '64px',
      height: '64px',
      margin: '0 auto 16px',
      color: '#9ca3af',
    },
    emptyTitle: {
      fontSize: '18px',
      fontWeight: '500',
      color: '#111827',
      marginBottom: '8px',
    },
    emptyText: {
      fontSize: '14px',
      color: '#6b7280',
    },
  };

  // Подготовка данных для экспорта
  const prepareExportData = () => {
    return Object.entries(currentCatData).map(([subject, data]) => ({
      name: subject,
      value: data.averageScore,
      additionalInfo: `Сдавших: ${data.completedTests} из ${data.totalStudents}`
    }));
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  return (
    <div className="teacher-analytics">
      <TeacherProfileMenu />
      <BackgroundProfile>
        <div style={styles.container}>
          {/* Шапка с общими контролами и статистикой */}
          <div style={styles.panel}>
            <div style={{ ...styles.flexBetween, marginBottom: '16px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
                Аналитика учебных дисциплин
              </h1>
            </div>

            {/* Общая статистика */}
            {overallStats && (
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statIconLabel}>
                    <Users style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                    <span style={{ color: '#3b82f6' }}>Студентов</span>
                  </div>
                  <div style={{ ...styles.statValue, color: '#1e3a8a' }}>
                    {overallStats.totalStudents}
                  </div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statIconLabel}>
                    <TrendingUp style={{ width: '20px', height: '20px', color: '#10b981' }} />
                    <span style={{ color: '#10b981' }}>Ср. % вып.</span>
                  </div>
                  <div style={{ ...styles.statValue, color: '#047857' }}>
                    {overallStats.avgCompletion}%
                  </div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statIconLabel}>
                    <Award style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
                    <span style={{ color: '#f59e0b' }}>Ср. балл</span>
                  </div>
                  <div style={{ ...styles.statValue, color: '#92400e' }}>
                    {overallStats.avgScore}
                  </div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statIconLabel}>
                    <Settings style={{ width: '20px', height: '20px', color: '#8b5cf6' }} />
                    <span style={{ color: '#8b5cf6' }}>Предметов</span>
                  </div>
                  <div style={{ ...styles.statValue, color: '#5b21b6' }}>
                    {overallStats.subjectsCount}
                  </div>
                </div>
              </div>
            )}

            {/* Контролы */}
            <div style={{ marginTop: '16px' }}>
              <div style={styles.controlsRow}>
                {/* Тип анализа */}
                <div style={styles.controlGroup}>
                  <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Тип анализа:
                  </label>
                  <select
                    style={styles.select}
                    value={analysisType}
                    onChange={e => {
                      setAnalysisType(e.target.value);
                      setSelectedSubcategory('all');
                    }}
                  >
                    {Object.entries(analysisTypes).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Категория */}
                <div style={styles.controlGroup}>
                  <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Категория:
                  </label>
                  <select
                    style={styles.select}
                    value={selectedCategory}
                    onChange={e => {
                      setSelectedCategory(e.target.value);
                      setSelectedSubcategory('all');
                    }}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Тест */}
                <div style={styles.controlGroup}>
                  <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Тест:
                  </label>
                  <select
                    style={styles.select}
                    value={selectedTest}
                    onChange={e => setSelectedTest(e.target.value)}
                  >
                    {tests.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                {/* Экспорт */}
                <div style={{ ...styles.controlGroup, marginTop: 'auto' }}>
                  <button style={styles.buttonExport} onClick={handleExport}>
                    <FileText style={{ width: '16px', height: '16px' }} />
                    Экспорт данных
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Детальная статистика по предметам */}
          <div style={styles.panel}>
            <h2 style={styles.sectionTitle}>
              Статистика по предметам: {CATEGORIES.find(c => c.value === selectedCategory)?.name}
              {selectedSubcategory && selectedSubcategory !== 'all' ? ` → ${selectedSubcategory}` : ''}
            </h2>

            {Object.keys(currentCatData).length > 0 ? (
              <div style={styles.cardsGrid}>
                {Object.entries(currentCatData).map(([subject, data]) => {
                  const pct = getCompletionPercentage(data.completedTests, data.totalStudents);

                  return (
                    <div key={subject} style={styles.card}>
                      {/* Заголовок */}
                      <div style={styles.cardHeader}>
                        <h3 style={styles.cardTitle}>{subject}</h3>
                        <div style={styles.badge(data.averageScore)}>
                          {data.averageScore} балл
                        </div>
                      </div>

                      {/* Прогресс выполнения */}
                      <div style={styles.progressContainer}>
                        <div style={styles.progressLabelRow}>
                          <span style={{ color: '#4b5563' }}>Выполнение тестов</span>
                          <span style={{ fontWeight: '500', color: '#111827' }}>{pct}%</span>
                        </div>
                        <div style={styles.progressBarBackground}>
                          <div style={styles.progressBarFill(pct)} />
                        </div>
                      </div>

                      {/* Основная информация */}
                      <div style={styles.infoRow}>
                        <span style={{ color: '#4b5563' }}>Всего студентов:</span>
                        <span style={{ fontWeight: '500', color: '#111827' }}>{data.totalStudents}</span>
                      </div>
                      <div style={styles.infoRow}>
                        <span style={{ color: '#4b5563' }}>Прошли тест:</span>
                        <span style={{ fontWeight: '500', color: getCompletionColor(data.completedTests, data.totalStudents) }}>
                          {data.completedTests}
                        </span>
                      </div>
                      <div style={styles.infoRow}>
                        <span style={{ color: '#4b5563' }}>Средний балл:</span>
                        <span style={{ fontWeight: '500', color: getScoreColor(data.averageScore) }}>
                          {data.averageScore}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={styles.emptyState}>
                <Settings style={styles.emptyIcon} />
                <div style={styles.emptyTitle}>Нет данных</div>
                <div style={styles.emptyText}>Данные для выбранных параметров отсутствуют</div>
              </div>
            )}
          </div>
        </div>
      </BackgroundProfile>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={{
          type: 'analytics',
          chartData: prepareExportData()
        }}
      />
    </div>
  );
};

export default DisciplineAnalytics;