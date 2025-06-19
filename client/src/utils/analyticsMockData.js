// Общие типы анализа для обеих страниц
export const analysisTypes = {
    'standard': 'Стандартный',
    'advanced': 'Расширенный',
    'detailed': 'Детальный'
};

// Параметры для дисциплинарной аналитики
export const disciplineAnalysisParams = {
    categories: [
        { value: 'programming', label: 'Программирование' },
        { value: 'databases', label: 'Базы данных' },
        { value: 'webdev', label: 'Веб-разработка' }
    ],
    tests: [
        { value: 'test1', label: 'Все тесты' },
        { value: 'test2', label: 'Последние тесты' },
        { value: 'test3', label: 'Избранные тесты' }
    ],
    periods: [
        { value: 'week', label: 'Неделя' },
        { value: 'month', label: 'Месяц' },
        { value: 'semester', label: 'Семестр' },
        { value: 'year', label: 'Год' }
    ]
};

// Данные для дисциплинарной аналитики
export const disciplineAnalyticsData = {
    standard: {
        programming: {
            summary: {
                totalStudents: 150,
                averageScore: 78.5,
                completedTests: 450
            },
            "Общая статистика": {
                count: 450,
                averageScore: 78.5,
                technologies: {
                    "C#": 120,
                    "Java": 95,
                    "Python": 135,
                    "JavaScript": 100
                }
            },
            "Распределение по курсам": {
                count: 150,
                comparison: {
                    "1 курс": 45,
                    "2 курс": 55,
                    "3 курс": 50
                }
            },
            "Тренды успеваемости": {
                count: 150,
                trends: {
                    "Улучшение": "35%",
                    "Стабильно": "45%",
                    "Ухудшение": "20%"
                }
            }
        },
        databases: {
            summary: {
                totalStudents: 120,
                averageScore: 82.3,
                completedTests: 360
            },
            "Общая статистика": {
                count: 360,
                averageScore: 82.3,
                technologies: {
                    "SQL": 150,
                    "MongoDB": 80,
                    "PostgreSQL": 130
                }
            },
            "Распределение по курсам": {
                count: 120,
                comparison: {
                    "1 курс": 35,
                    "2 курс": 45,
                    "3 курс": 40
                }
            },
            "Тренды успеваемости": {
                count: 120,
                trends: {
                    "Улучшение": "40%",
                    "Стабильно": "50%",
                    "Ухудшение": "10%"
                }
            }
        },
        webdev: {
            summary: {
                totalStudents: 180,
                averageScore: 75.8,
                completedTests: 540
            },
            "Общая статистика": {
                count: 540,
                averageScore: 75.8,
                technologies: {
                    "HTML/CSS": 180,
                    "JavaScript": 160,
                    "React": 120,
                    "Node.js": 80
                }
            },
            "Распределение по курсам": {
                count: 180,
                comparison: {
                    "1 курс": 55,
                    "2 курс": 65,
                    "3 курс": 60
                }
            },
            "Тренды успеваемости": {
                count: 180,
                trends: {
                    "Улучшение": "30%",
                    "Стабильно": "55%",
                    "Ухудшение": "15%"
                }
            }
        }
    },
    advanced: {
        programming: {
            summary: {
                totalStudents: 150,
                averageScore: 78.5,
                completedTests: 450
            },
            "Детальный анализ": {
                count: 450,
                technologies: {
                    "ООП": 150,
                    "Алгоритмы": 120,
                    "Структуры данных": 100,
                    "Паттерны": 80
                }
            },
            "Сложность материала": {
                count: 150,
                comparison: {
                    "Легкий": "30%",
                    "Средний": "45%",
                    "Сложный": "25%"
                }
            }
        },
        databases: {
            summary: {
                totalStudents: 120,
                averageScore: 82.3,
                completedTests: 360
            },
            "Детальный анализ": {
                count: 360,
                technologies: {
                    "Нормализация": 120,
                    "Индексы": 100,
                    "Транзакции": 80,
                    "Оптимизация": 60
                }
            },
            "Сложность материала": {
                count: 120,
                comparison: {
                    "Легкий": "25%",
                    "Средний": "50%",
                    "Сложный": "25%"
                }
            }
        },
        webdev: {
            summary: {
                totalStudents: 180,
                averageScore: 75.8,
                completedTests: 540
            },
            "Детальный анализ": {
                count: 540,
                technologies: {
                    "Frontend": 200,
                    "Backend": 180,
                    "API": 100,
                    "DevOps": 60
                }
            },
            "Сложность материала": {
                count: 180,
                comparison: {
                    "Легкий": "35%",
                    "Средний": "40%",
                    "Сложный": "25%"
                }
            }
        }
    },
    detailed: {
        programming: {
            summary: {
                totalStudents: 150,
                averageScore: 78.5,
                completedTests: 450
            },
            "Углубленный анализ": {
                count: 450,
                technologies: {
                    "Многопоточность": 50,
                    "Асинхронность": 45,
                    "Рефлексия": 35,
                    "Метапрограммирование": 20
                }
            },
            "Специализация": {
                count: 150,
                comparison: {
                    "Backend": "45%",
                    "Desktop": "30%",
                    "Mobile": "25%"
                }
            }
        },
        databases: {
            summary: {
                totalStudents: 120,
                averageScore: 82.3,
                completedTests: 360
            },
            "Углубленный анализ": {
                count: 360,
                technologies: {
                    "Репликация": 40,
                    "Шардинг": 35,
                    "Кластеризация": 25,
                    "Безопасность": 20
                }
            },
            "Специализация": {
                count: 120,
                comparison: {
                    "RDBMS": "50%",
                    "NoSQL": "30%",
                    "NewSQL": "20%"
                }
            }
        },
        webdev: {
            summary: {
                totalStudents: 180,
                averageScore: 75.8,
                completedTests: 540
            },
            "Углубленный анализ": {
                count: 540,
                technologies: {
                    "SPA": 60,
                    "PWA": 50,
                    "Микросервисы": 40,
                    "WebAssembly": 30
                }
            },
            "Специализация": {
                count: 180,
                comparison: {
                    "Frontend": "40%",
                    "Backend": "35%",
                    "Fullstack": "25%"
                }
            }
        }
    }
};

// Данные для TeacherAnalyticsPage
export const analysisData = {
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
                name: 'Углубленное изучение C#',
                data: [
                    { name: 'C# Advanced', value: 65, color: '#6A1B9A' },
                    { name: 'LINQ', value: 58, color: '#9C27B0' },
                    { name: 'ASP.NET Core', value: 52, color: '#FF7043' },
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