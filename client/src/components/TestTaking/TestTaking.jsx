import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LocalStorageService, { STORAGE_KEYS } from '../../services/localStorageService';
import { showSuccess, showError } from '../Notification/NotificationProvider';
import './TestTaking.css';

const TestTaking = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [test, setTest] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const loadTest = () => {
            const allTests = LocalStorageService.getItem(STORAGE_KEYS.TESTS, []);
            const foundTest = allTests.find(t => t.id === parseInt(testId));
            
            if (!foundTest) {
                showError('Ошибка', 'Тест не найден');
                navigate('/student/tests');
                return;
            }

            // Check if test is available
            const now = new Date();
            const startDate = new Date(foundTest.startDateTime);
            const endDate = new Date(foundTest.endDateTime);

            if (now < startDate) {
                showError('Ошибка', 'Тест еще не начался');
                navigate('/student/tests');
                return;
            }

            if (now > endDate) {
                showError('Ошибка', 'Тест уже завершен');
                navigate('/student/tests');
                return;
            }

            // Check if student has already completed this test
            const testResults = LocalStorageService.getItem(STORAGE_KEYS.TEST_RESULTS, []);
            const hasCompleted = testResults.some(result => 
                result.testId === foundTest.id && result.studentId === user.id
            );

            if (hasCompleted) {
                showError('Ошибка', 'Вы уже прошли этот тест');
                navigate('/student/tests');
                return;
            }

            setTest(foundTest);
            // Initialize answers object
            const initialAnswers = {};
            foundTest.questions.forEach(question => {
                initialAnswers[question.id] = question.type === 'closed' ? [] : '';
            });
            setAnswers(initialAnswers);

            // Set time left
            setTimeLeft(Math.floor((endDate - now) / 1000));
        };

        loadTest();
    }, [testId, navigate, user.id]);

    useEffect(() => {
        if (!timeLeft) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleAnswerChange = (questionId, value, isCheckbox = false) => {
        if (isCheckbox) {
            setAnswers(prev => {
                const currentAnswers = [...(prev[questionId] || [])];
                const index = currentAnswers.indexOf(value);
                
                if (index === -1) {
                    currentAnswers.push(value);
                } else {
                    currentAnswers.splice(index, 1);
                }

                return {
                    ...prev,
                    [questionId]: currentAnswers
                };
            });
        } else {
            setAnswers(prev => ({
                ...prev,
                [questionId]: value
            }));
        }
    };

    const handleSubmit = () => {
        if (!test) return;

        // Calculate score
        let totalScore = 0;
        let maxScore = test.questions.length;

        test.questions.forEach(question => {
            if (question.type === 'closed') {
                const studentAnswers = answers[question.id] || [];
                const correctAnswers = question.correctOptions;
                
                // Check if arrays are equal (order doesn't matter)
                const isCorrect = studentAnswers.length === correctAnswers.length &&
                    studentAnswers.every(answer => correctAnswers.includes(parseInt(answer)));
                
                if (isCorrect) totalScore++;
            } else {
                const studentAnswer = (answers[question.id] || '').trim().toLowerCase();
                const correctAnswer = question.correctAnswer.trim().toLowerCase();
                
                if (studentAnswer === correctAnswer) totalScore++;
            }
        });

        const score = (totalScore / maxScore) * 100;

        // Save result
        const result = {
            id: Date.now(),
            testId: test.id,
            studentId: user.id,
            studentName: user.fullName,
            answers,
            score,
            submittedAt: new Date().toISOString()
        };

        const existingResults = LocalStorageService.getItem(STORAGE_KEYS.TEST_RESULTS, []);
        LocalStorageService.setItem(STORAGE_KEYS.TEST_RESULTS, [...existingResults, result]);

        showSuccess('Успешно', 'Тест завершен');
        navigate(`/student/test-results/${test.id}`);
    };

    if (!test) return null;

    const currentQuestion = test.questions[currentQuestionIndex];
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="test-taking">
            <div className="test-header">
                <h2>{test.title}</h2>
                <div className="test-info">
                    <p>Вопрос {currentQuestionIndex + 1} из {test.questions.length}</p>
                    <p className="time-left">Осталось времени: {formatTime(timeLeft)}</p>
                </div>
            </div>

            <div className="question-container">
                <p className="question-text">{currentQuestion.text}</p>

                <div className="answer-section">
                    {currentQuestion.type === 'closed' ? (
                        <div className="options-list">
                            {currentQuestion.options.map((option, index) => (
                                <label key={index} className="option-label">
                                    <input
                                        type="checkbox"
                                        checked={(answers[currentQuestion.id] || []).includes(index.toString())}
                                        onChange={() => handleAnswerChange(currentQuestion.id, index.toString(), true)}
                                    />
                                    <span className="option-text">{option}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <textarea
                            value={answers[currentQuestion.id] || ''}
                            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                            placeholder="Введите ваш ответ"
                            rows={4}
                        />
                    )}
                </div>
            </div>

            <div className="navigation-buttons">
                <button
                    className="nav-button"
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    disabled={currentQuestionIndex === 0}
                >
                    Предыдущий вопрос
                </button>

                {currentQuestionIndex === test.questions.length - 1 ? (
                    <button
                        className="submit-button"
                        onClick={handleSubmit}
                    >
                        Завершить тест
                    </button>
                ) : (
                    <button
                        className="nav-button"
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    >
                        Следующий вопрос
                    </button>
                )}
            </div>

            <div className="questions-navigation">
                {test.questions.map((_, index) => (
                    <button
                        key={index}
                        className={`question-dot ${index === currentQuestionIndex ? 'active' : ''} ${answers[test.questions[index].id] ? 'answered' : ''}`}
                        onClick={() => setCurrentQuestionIndex(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TestTaking; 