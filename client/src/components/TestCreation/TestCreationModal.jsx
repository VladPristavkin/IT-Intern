import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LocalStorageService, { STORAGE_KEYS } from '../../services/localStorageService';
import { showSuccess } from '../Notification/NotificationProvider';
import './TestCreationModal.css';

const TestCreationModal = ({ onClose }) => {
    const { user } = useAuth();
    const [step, setStep] = useState('name'); // name, access, questions, preview
    const [testData, setTestData] = useState({
        title: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        questions: []
    });

    const [currentQuestion, setCurrentQuestion] = useState({
        text: '',
        type: 'closed',
        technology: '',
        subTechnology: '',
        correctAnswer: '',
        options: ['', '', '', ''],
        correctOptions: []
    });

    const handleTestDataChange = (e) => {
        const { name, value } = e.target;
        setTestData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setCurrentQuestion(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOptionChange = (index, value) => {
        setCurrentQuestion(prev => ({
            ...prev,
            options: prev.options.map((opt, i) => i === index ? value : opt)
        }));
    };

    const handleCorrectOptionToggle = (index) => {
        setCurrentQuestion(prev => {
            const newCorrectOptions = [...prev.correctOptions];
            const position = newCorrectOptions.indexOf(index);
            
            if (position === -1) {
                newCorrectOptions.push(index);
            } else {
                newCorrectOptions.splice(position, 1);
            }

            return {
                ...prev,
                correctOptions: newCorrectOptions
            };
        });
    };

    const addQuestion = () => {
        const questionToAdd = {
            ...currentQuestion,
            id: Date.now()
        };

        setTestData(prev => ({
            ...prev,
            questions: [...prev.questions, questionToAdd]
        }));

        setCurrentQuestion({
            text: '',
            type: 'closed',
            technology: '',
            subTechnology: '',
            correctAnswer: '',
            options: ['', '', '', ''],
            correctOptions: []
        });
    };

    const removeQuestion = (questionId) => {
        setTestData(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== questionId)
        }));
    };

    const handleTestNameSubmit = () => {
        if (testData.title.trim()) {
            setStep('access');
        }
    };

    const handleAccessSubmit = () => {
        if (testData.startDate && testData.startTime && testData.endDate && testData.endTime) {
            setStep('questions');
        }
    };

    const handlePublish = () => {
        const test = {
            id: Date.now(),
            teacherId: user.id,
            teacherName: user.fullName,
            ...testData,
            startDateTime: `${testData.startDate}T${testData.startTime}`,
            endDateTime: `${testData.endDate}T${testData.endTime}`,
            status: 'active',
            createdAt: new Date().toISOString()
        };

        const existingTests = LocalStorageService.getItem(STORAGE_KEYS.TESTS, []);
        LocalStorageService.setItem(STORAGE_KEYS.TESTS, [...existingTests, test]);

        showSuccess('Успешно', 'Тест опубликован');
        onClose();
    };

    const renderStep = () => {
        switch (step) {
            case 'name':
                return (
                    <div className="test-creation-step">
                        <h2>Конструктор тестов</h2>
                        <div className="input-group">
                            <input
                                type="text"
                                name="title"
                                value={testData.title}
                                onChange={handleTestDataChange}
                                placeholder="Введите имя теста"
                                className="test-name-input"
                            />
                        </div>
                        <div className="test-creation-buttons">
                            <button 
                                className="test-creation-button"
                                onClick={handleTestNameSubmit}
                            >
                                Настроить доступ к тесту
                            </button>
                            <button 
                                className="test-creation-button"
                                onClick={handleAccessSubmit}
                            >
                                Настроить вопросы и ответы
                            </button>
                            <button 
                                className="test-creation-button"
                                onClick={handlePublish}
                            >
                                Опубликовать
                            </button>
                        </div>
                    </div>
                );

            case 'access':
                return (
                    <div className="test-creation-step">
                        <h2>Настройка доступа</h2>
                        <div className="datetime-groups">
                            <div className="datetime-group">
                                <h3>Начало теста</h3>
                                <div className="datetime-inputs">
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={testData.startDate}
                                        onChange={handleTestDataChange}
                                        required
                                    />
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={testData.startTime}
                                        onChange={handleTestDataChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="datetime-group">
                                <h3>Окончание теста</h3>
                                <div className="datetime-inputs">
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={testData.endDate}
                                        onChange={handleTestDataChange}
                                        required
                                    />
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={testData.endTime}
                                        onChange={handleTestDataChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button 
                                className="modal-button secondary"
                                onClick={() => setStep('name')}
                            >
                                Назад
                            </button>
                            <button 
                                className="modal-button primary"
                                onClick={() => setStep('questions')}
                                disabled={!testData.startDate || !testData.startTime || !testData.endDate || !testData.endTime}
                            >
                                Настроить вопросы и ответы
                            </button>
                        </div>
                    </div>
                );

            case 'questions':
                return (
                    <div className="test-creation-step">
                        <h2>Вопросы и ответы</h2>
                        <div className="questions-list">
                            {testData.questions.map((question, index) => (
                                <div key={question.id} className="question-item">
                                    <div className="question-header">
                                        <h3>Вопрос {index + 1}</h3>
                                        <button
                                            className="remove-question"
                                            onClick={() => removeQuestion(question.id)}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                    <p>{question.text}</p>
                                    <p className="question-type">
                                        {question.type === 'closed' ? 'Закрытый вопрос' : 'Открытый вопрос'}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="add-question-form">
                            <div className="question-type-select">
                                <select
                                    name="type"
                                    value={currentQuestion.type}
                                    onChange={handleQuestionChange}
                                >
                                    <option value="closed">Закрытый вопрос</option>
                                    <option value="open">Открытый вопрос</option>
                                </select>
                            </div>
                            <textarea
                                name="text"
                                value={currentQuestion.text}
                                onChange={handleQuestionChange}
                                placeholder="Текст вопроса"
                            />
                            {currentQuestion.type === 'closed' ? (
                                <div className="options-group">
                                    {currentQuestion.options.map((option, index) => (
                                        <div key={index} className="option-item">
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                placeholder={`Вариант ${index + 1}`}
                                            />
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={currentQuestion.correctOptions.includes(index)}
                                                    onChange={() => handleCorrectOptionToggle(index)}
                                                />
                                                Правильный ответ
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="correct-answer-group">
                                    <textarea
                                        name="correctAnswer"
                                        value={currentQuestion.correctAnswer}
                                        onChange={handleQuestionChange}
                                        placeholder="Правильный ответ"
                                    />
                                </div>
                            )}
                            <button
                                className="add-question-button"
                                onClick={addQuestion}
                                disabled={!currentQuestion.text || (currentQuestion.type === 'closed' && !currentQuestion.correctOptions.length) || (currentQuestion.type === 'open' && !currentQuestion.correctAnswer)}
                            >
                                Добавить вопрос
                            </button>
                        </div>
                        <div className="modal-buttons">
                            <button 
                                className="modal-button secondary"
                                onClick={() => setStep('access')}
                            >
                                Назад
                            </button>
                            <button 
                                className="modal-button primary"
                                onClick={() => setStep('preview')}
                                disabled={!testData.questions.length}
                            >
                                Предпросмотр
                            </button>
                        </div>
                    </div>
                );

            case 'preview':
                return (
                    <div className="test-creation-step">
                        <h2>Предпросмотр теста</h2>
                        <div className="test-preview">
                            <h3>{testData.title}</h3>
                            <div className="test-period">
                                <p>Период проведения:</p>
                                <p>{testData.startDate} {testData.startTime} - {testData.endDate} {testData.endTime}</p>
                            </div>
                            <div className="questions-preview">
                                {testData.questions.map((question, index) => (
                                    <div key={question.id} className="preview-question">
                                        <h4>Вопрос {index + 1}</h4>
                                        <p>{question.text}</p>
                                        {question.type === 'closed' ? (
                                            <div className="preview-options">
                                                {question.options.map((option, i) => (
                                                    <div key={i} className={`preview-option ${question.correctOptions.includes(i) ? 'correct' : ''}`}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="preview-answer">
                                                <p>Правильный ответ:</p>
                                                <p>{question.correctAnswer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button 
                                className="modal-button secondary"
                                onClick={() => setStep('questions')}
                            >
                                Назад
                            </button>
                            <button 
                                className="modal-button primary"
                                onClick={handlePublish}
                            >
                                Опубликовать
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="modal-overlay">
            <div className="test-creation-modal">
                <button className="close-button" onClick={onClose}>×</button>
                {renderStep()}
            </div>
        </div>
    );
};

export default TestCreationModal; 