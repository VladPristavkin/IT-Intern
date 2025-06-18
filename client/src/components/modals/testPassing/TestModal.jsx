import React, { useState, useEffect } from 'react';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import './TestModal.css';
import { useNavigate } from 'react-router-dom';
import QuestionBlock from '../../QuestionBlock/QuestionBlock';

const TestModal = ({ isOpen, onClose, testData }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [subjects, setSubjects] = useState({});
    const [confidenceLevel, setConfidenceLevel] = useState({});
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // для редиректа
    const [cameFromReview, setCameFromReview] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            const timer = setTimeout(() => {
                navigate('/student/analytics'); // редирект
            }, 50000);

            return () => clearTimeout(timer); // очистка таймера
        }
    }, [isSubmitting, navigate]);

    const mockTestData = {
        id: 1,
        testName: 'Проверка знаний',
        teacher: 'Сергиенко О.В.',
        date: '29.05.2025',
        questions: [
            {
                id: 1,
                category: 'C#',
                subcategory: 'ASP.NET',
                type: 'closed',
                question: 'Какой из следующих методов используется для создания Web API контроллера в ASP.NET Core?',
                options: ['Controller', 'ApiController', 'ControllerBase', 'WebApiController'],
            },
            {
                id: 2,
                category: 'C#',
                subcategory: 'LINQ',
                type: 'open',
                question: 'Напишите LINQ запрос для выбора всех элементов из коллекции, где свойство Age больше 18',
            },
            {
                id: 3,
                category: 'Database',
                subcategory: 'SQL',
                type: 'closed',
                question: 'Какая команда SQL используется для получения данных из таблицы?',
                options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'],
            },
            {
                id: 4,
                category: 'React',
                subcategory: 'Hooks',
                type: 'closed',
                question: 'Какой хук используется для управления локальным состоянием компонента в React?',
                options: ['useEffect', 'useState', 'useRef', 'useReducer'],
            },
            {
                id: 5,
                category: 'C#',
                subcategory: 'OOP',
                type: 'closed',
                question: 'Какой модификатор доступа позволяет использовать метод только внутри текущего класса?',
                options: ['public', 'private', 'protected', 'internal'],
            }
        ],
    };

    const subjectOptions = [
        'Программирование',
        'Веб-разработка',
        'Базы данных',
        'Алгоритмы и структуры данных',
        'Объектно-ориентированное программирование',
        'Самостоятельное изучение',
    ];

    const currentQuestionData = mockTestData.questions[currentQuestion];
    const totalQuestions = mockTestData.questions.length;

    const handleAnswerChange = (value) => {
        setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
    };

    const handleSubjectChange = (subject) => {
        setSubjects((prev) => ({ ...prev, [currentQuestion]: subject }));
    };

    const handleConfidenceChange = (value) => {
        setConfidenceLevel((prev) => ({ ...prev, [currentQuestion]: value }));
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        console.log('Ответы:', answers);
        console.log('Предметы:', subjects);
        console.log('Уровень уверенности:', confidenceLevel);
        setIsSubmitting(true);
    };

    if (!isOpen) return null;


    if (isSubmitting) {
        return (
            <div className="modal-overlay">
                <div className="modal-container loading-modal">
                    <div className="loading-spinner-test" />
                    <p>Обработка результатов... Пожалуйста, подождите</p>
                </div>
            </div>
        );
    }

    if (isReviewMode) {
        return (
            <div className="modal-overlay">
                <div className="modal-container">
                    <div className="modal-header">
                        <h2 className="modal-title">Проверьте себя</h2>
                        <button onClick={onClose} className="modal-close-btn">
                            <X className="icon-medium" />
                        </button>
                    </div>

                    <div className="modal-content">
                        <table className="review-table">
                            <thead>
                                <tr>
                                    <th>Вопрос</th>
                                    <th>Ответ</th>
                                    <th>Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockTestData.questions.map((q, index) => (
                                    <tr key={q.id}>
                                        <td>{index + 1}</td>
                                        <td>{answers[index] ? '✔ Ответ дан' : '— Нет ответа'}</td>
                                        <td>
                                            <button
                                                className="btn btn-link"
                                                onClick={() => {
                                                    setCurrentQuestion(index);
                                                    setIsReviewMode(false);
                                                    setCameFromReview(true); // <- добавляем
                                                }}
                                            >
                                                Перейти
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-footer">
                        <button onClick={handleSubmit} className="btn btn-green">
                            Завершить тестирование
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                {/* Header */}
                <div className="modal-header">
                    <div className="modal-header-left">
                        <div className="modal-icon">IT</div>
                        <div>
                            <h2 className="modal-title">{mockTestData.testName}</h2>
                            <div className="modal-meta">
                                <Calendar className="icon-small" />
                                <span>{mockTestData.date}</span>
                                <span className="separator"></span>
                                <span>{mockTestData.teacher}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="modal-close-btn">
                        <X className="icon-medium" />
                    </button>
                </div>

                {/* Question Counter */}
                <div className="modal-progress">
                    <div className="progress-info">
                        Вопрос {currentQuestion + 1} из {totalQuestions}
                    </div>
                    <div className="progress-dots">
                        {Array.from({ length: totalQuestions }, (_, i) => (
                            <div
                                key={i}
                                className={`dot ${i === currentQuestion
                                    ? 'dot-current'
                                    : answers[i] !== undefined
                                        ? 'dot-answered'
                                        : 'dot-default'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="modal-content">
                    {/* Tags */}
                    <div className="tags">
                        <span className="tag tag-blue">{currentQuestionData.category}</span>
                        {/* <span className="tag tag-green">{currentQuestionData.subcategory}</span> */}
                        <span className="tag tag-purple">
                            {currentQuestionData.type === 'open' ? 'Открытый вопрос' : 'Закрытый вопрос'}
                        </span>
                    </div>

                    {/* Question */}
                    <QuestionBlock
                        questionData={currentQuestionData}
                        questionIndex={currentQuestion}
                        answer={answers[currentQuestion]}
                        subject={subjects[currentQuestion]}
                        confidence={confidenceLevel[currentQuestion]}
                        onAnswerChange={handleAnswerChange}
                        onSubjectChange={handleSubjectChange}
                        onConfidenceChange={handleConfidenceChange}
                        subjectOptions={subjectOptions}
                    />
                </div>
                {/* Footer */}
                <div className="modal-footer">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="btn btn-secondary"
                    >
                        <ChevronLeft className="icon-small" />
                        <span>Предыдущий</span>
                    </button>

                    <div className="footer-progress">
                        {currentQuestion + 1} / {totalQuestions}
                    </div>

                    {currentQuestion === totalQuestions - 1 ? (
                        <button onClick={() => setIsReviewMode(true)} className="btn btn-secondary">
                            Перейти к проверке
                        </button>
                    ) : (
                        <button onClick={handleNext} className="btn btn-blue">
                            <span>Следующий</span>
                            <ChevronRight className="icon-small" />
                        </button>
                    )}

                    {cameFromReview && currentQuestion < totalQuestions - 1 && (
                        <button
                            onClick={() => {
                                setIsReviewMode(true);
                                setCameFromReview(false);
                            }}
                            className="btn btn-outline"
                        >
                            Назад к проверке
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestModal;