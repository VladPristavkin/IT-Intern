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
    const [testQuestions, setTestQuestions] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [cameFromReview, setCameFromReview] = useState(false);

    useEffect(() => {
        if (testData) {
            // TODO: Replace with actual API call when backend is ready
            // For now using mock data
            const fetchTestQuestions = async () => {
                try {
                    // Simulating API call
                    const mockQuestions = {
                        id: testData.id,
                        testName: testData.testName,
                        teacher: testData.teacher,
                        date: testData.date,
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
                    setTestQuestions(mockQuestions);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching test questions:', error);
                    setLoading(false);
                }
            };

            fetchTestQuestions();
        }
    }, [testData]);

    useEffect(() => {
        if (isSubmitting) {
            const submitTestResults = async () => {
                try {
                    // TODO: Replace with actual API call when backend is ready
                    // For now just simulating API call
                    const results = {
                        testId: testData.id,
                        answers,
                        subjects,
                        confidenceLevels: confidenceLevel,
                        submittedAt: new Date().toISOString()
                    };
                    
                    console.log('Submitting test results:', results);
                    
                    // Simulate API delay
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    // Navigate to analytics page after successful submission
                    navigate('/student/analytics');
                } catch (error) {
                    console.error('Error submitting test results:', error);
                    setIsSubmitting(false);
                    // TODO: Show error message to user
                }
            };

            submitTestResults();
        }
    }, [isSubmitting, testData, answers, subjects, confidenceLevel, navigate]);

    const subjectOptions = [
        'Программирование',
        'Веб-разработка',
        'Базы данных',
        'Алгоритмы и структуры данных',
        'Объектно-ориентированное программирование',
        'Самостоятельное изучение',
    ];

    if (!isOpen || !testData || loading) return null;

    if (isSubmitting) {
        return (
            <div className="modal-overlay">
                <div className="modal-container loading-modal">
                    <div className="loading-spinner" />
                    <p>Обработка результатов... Пожалуйста, подождите</p>
                </div>
            </div>
        );
    }

    const currentQuestionData = testQuestions?.questions[currentQuestion];
    const totalQuestions = testQuestions?.questions.length || 0;

    const handleAnswerChange = (value) => {
        setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
    };

    const handleSubjectChange = (subject) => {
        setSubjects(prev => ({ ...prev, [currentQuestion]: subject }));
    };

    const handleConfidenceChange = (value) => {
        setConfidenceLevel(prev => ({ ...prev, [currentQuestion]: value }));
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        // Validate that all questions have been answered
        const unansweredQuestions = testQuestions.questions.reduce((acc, _, index) => {
            if (!answers[index]) acc.push(index + 1);
            return acc;
        }, []);

        if (unansweredQuestions.length > 0) {
            alert(`Пожалуйста, ответьте на все вопросы. Не отвечены вопросы: ${unansweredQuestions.join(', ')}`);
            return;
        }

        // Validate that all subjects are selected
        const unselectedSubjects = testQuestions.questions.reduce((acc, _, index) => {
            if (!subjects[index]) acc.push(index + 1);
            return acc;
        }, []);

        if (unselectedSubjects.length > 0) {
            alert(`Пожалуйста, выберите предмет для всех вопросов. Не выбраны предметы для вопросов: ${unselectedSubjects.join(', ')}`);
            return;
        }

        setIsSubmitting(true);
    };

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
                                {testQuestions.questions.map((q, index) => (
                                    <tr key={q.id}>
                                        <td>{index + 1}</td>
                                        <td>{answers[index] ? '✔ Ответ дан' : '— Нет ответа'}</td>
                                        <td>
                                            <button
                                                className="btn btn-link"
                                                onClick={() => {
                                                    setCurrentQuestion(index);
                                                    setIsReviewMode(false);
                                                    setCameFromReview(true);
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
                            <h2 className="modal-title">{testQuestions.testName}</h2>
                            <div className="modal-meta">
                                <Calendar className="icon-small" />
                                <span>{testQuestions.date}</span>
                                <span className="separator"></span>
                                <span>{testQuestions.teacher}</span>
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
                    <div className="modal-navigation">
                        <button
                            onClick={handlePrevious}
                            className="btn btn-icon"
                            disabled={currentQuestion === 0}
                        >
                            <ChevronLeft className="icon-medium" />
                            Назад
                        </button>
                        {currentQuestion < totalQuestions - 1 ? (
                            <button onClick={handleNext} className="btn btn-icon">
                                Далее
                                <ChevronRight className="icon-medium" />
                            </button>
                        ) : (
                            <button onClick={() => setIsReviewMode(true)} className="btn btn-green">
                                Проверить
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestModal;