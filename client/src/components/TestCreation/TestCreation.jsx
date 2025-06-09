import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LocalStorageService, { STORAGE_KEYS } from '../../services/localStorageService';
import { showSuccess } from '../Notification/NotificationProvider';
import './TestCreation.css';

const TestCreation = () => {
    const { user } = useAuth();
    const [testData, setTestData] = useState({
        title: '',
        description: '',
        technology: '',
        subTechnology: '',
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

        // Reset current question form
        setCurrentQuestion({
            text: '',
            type: 'closed',
            technology: testData.technology,
            subTechnology: testData.subTechnology,
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

    const handleSubmit = (e) => {
        e.preventDefault();

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

        // Save test to local storage
        const existingTests = LocalStorageService.getItem(STORAGE_KEYS.TESTS, []);
        LocalStorageService.setItem(STORAGE_KEYS.TESTS, [...existingTests, test]);

        showSuccess('Успешно', 'Тест успешно создан');

        // Reset form
        setTestData({
            title: '',
            description: '',
            technology: '',
            subTechnology: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            questions: []
        });
    };

    return (
        <div className="test-creation-container">
            <h2>Создание нового теста</h2>
            <form onSubmit={handleSubmit} className="test-form">
                <div className="form-section">
                    <h3>Основная информация</h3>
                    <div className="form-group">
                        <label>Название теста</label>
                        <input
                            type="text"
                            name="title"
                            value={testData.title}
                            onChange={handleTestDataChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Описание</label>
                        <textarea
                            name="description"
                            value={testData.description}
                            onChange={handleTestDataChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Технология</label>
                        <input
                            type="text"
                            name="technology"
                            value={testData.technology}
                            onChange={handleTestDataChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Подкатегория</label>
                        <input
                            type="text"
                            name="subTechnology"
                            value={testData.subTechnology}
                            onChange={handleTestDataChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Время проведения</h3>
                    <div className="datetime-group">
                        <div className="form-group">
                            <label>Дата начала</label>
                            <input
                                type="date"
                                name="startDate"
                                value={testData.startDate}
                                onChange={handleTestDataChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Время начала</label>
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
                        <div className="form-group">
                            <label>Дата окончания</label>
                            <input
                                type="date"
                                name="endDate"
                                value={testData.endDate}
                                onChange={handleTestDataChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Время окончания</label>
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

                <div className="form-section">
                    <h3>Вопросы</h3>
                    <div className="questions-list">
                        {testData.questions.map((question, index) => (
                            <div key={question.id} className="question-item">
                                <div className="question-header">
                                    <span>Вопрос {index + 1}</span>
                                    <button
                                        type="button"
                                        className="remove-question"
                                        onClick={() => removeQuestion(question.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                                <p><strong>Текст:</strong> {question.text}</p>
                                <p><strong>Тип:</strong> {question.type === 'closed' ? 'Закрытый' : 'Открытый'}</p>
                                {question.type === 'closed' && (
                                    <div>
                                        <p><strong>Варианты ответов:</strong></p>
                                        <ul>
                                            {question.options.map((option, i) => (
                                                <li key={i} className={question.correctOptions.includes(i) ? 'correct-option' : ''}>
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {question.type === 'open' && (
                                    <p><strong>Правильный ответ:</strong> {question.correctAnswer}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="add-question-form">
                        <h4>Добавить вопрос</h4>
                        <div className="form-group">
                            <label>Текст вопроса</label>
                            <textarea
                                name="text"
                                value={currentQuestion.text}
                                onChange={handleQuestionChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Тип вопроса</label>
                            <select
                                name="type"
                                value={currentQuestion.type}
                                onChange={handleQuestionChange}
                            >
                                <option value="closed">Закрытый</option>
                                <option value="open">Открытый</option>
                            </select>
                        </div>

                        {currentQuestion.type === 'closed' ? (
                            <div className="options-group">
                                <label>Варианты ответов</label>
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
                                            Правильный
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="form-group">
                                <label>Правильный ответ</label>
                                <textarea
                                    name="correctAnswer"
                                    value={currentQuestion.correctAnswer}
                                    onChange={handleQuestionChange}
                                />
                            </div>
                        )}

                        <button
                            type="button"
                            className="add-question-button"
                            onClick={addQuestion}
                            disabled={!currentQuestion.text || (currentQuestion.type === 'closed' && !currentQuestion.correctOptions.length) || (currentQuestion.type === 'open' && !currentQuestion.correctAnswer)}
                        >
                            Добавить вопрос
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={!testData.title || !testData.questions.length}
                >
                    Создать тест
                </button>
            </form>
        </div>
    );
};

export default TestCreation; 