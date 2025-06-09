import React, { useState } from 'react';
import './TestQuestionsStep.css';

const TestQuestionsStep = ({ onSubmit, categories, initialQuestions = [] }) => {
    const [questions, setQuestions] = useState(initialQuestions);
    const [currentQuestion, setCurrentQuestion] = useState({
        text: '',
        type: 'closed',
        options: ['', ''],
        correctOptions: [],
        correctAnswer: '',
        category: '',
        subCategory: ''
    });

    const handleAddOption = () => {
        setCurrentQuestion(prev => ({
            ...prev,
            options: [...prev.options, '']
        }));
    };

    const handleOptionChange = (index, value) => {
        setCurrentQuestion(prev => ({
            ...prev,
            options: prev.options.map((opt, i) => i === index ? value : opt)
        }));
    };

    const handleCorrectOptionToggle = (index) => {
        setCurrentQuestion(prev => ({
            ...prev,
            correctOptions: prev.correctOptions.includes(index)
                ? prev.correctOptions.filter(i => i !== index)
                : [...prev.correctOptions, index]
        }));
    };

    const handleAddQuestion = () => {
        if (currentQuestion.text && 
            ((currentQuestion.type === 'closed' && currentQuestion.correctOptions.length > 0) ||
             (currentQuestion.type === 'open' && currentQuestion.correctAnswer))) {
            
            setQuestions(prev => [...prev, { ...currentQuestion, id: Date.now() }]);
            setCurrentQuestion({
                text: '',
                type: 'closed',
                options: ['', ''],
                correctOptions: [],
                correctAnswer: '',
                category: '',
                subCategory: ''
            });
        }
    };

    const handleSubmit = () => {
        if (questions.length > 0) {
            onSubmit(questions);
        }
    };

    return (
        <div className="test-questions-step">
            <div className="question-form">
                <div className="input-group">
                    <label>Вопрос:</label>
                    <textarea
                        value={currentQuestion.text}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, text: e.target.value }))}
                        placeholder="Введите текст вопроса"
                    />
                </div>

                <div className="input-group">
                    <label>Тип вопроса:</label>
                    <select
                        value={currentQuestion.type}
                        onChange={(e) => setCurrentQuestion(prev => ({ 
                            ...prev, 
                            type: e.target.value,
                            correctOptions: [],
                            correctAnswer: ''
                        }))}
                    >
                        <option value="closed">Закрытый</option>
                        <option value="open">Открытый</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Категория:</label>
                    <select
                        value={currentQuestion.category}
                        onChange={(e) => setCurrentQuestion(prev => ({ 
                            ...prev, 
                            category: e.target.value,
                            subCategory: ''
                        }))}
                        required
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label>Подкатегория:</label>
                    <select
                        value={currentQuestion.subCategory}
                        onChange={(e) => setCurrentQuestion(prev => ({ 
                            ...prev, 
                            subCategory: e.target.value 
                        }))}
                        required
                    >
                        <option value="">Выберите подкатегорию</option>
                        {categories
                            .find(cat => cat.name === currentQuestion.category)?.subCategories
                            .map(sub => (
                                <option key={sub.id} value={sub.name}>{sub.name}</option>
                            ))}
                    </select>
                </div>

                {currentQuestion.type === 'closed' ? (
                    <div className="options-group">
                        <label>Варианты ответов:</label>
                        {currentQuestion.options.map((option, index) => (
                            <div key={index} className="option-item">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    placeholder={`Вариант ${index + 1}`}
                                />
                                <input
                                    type="checkbox"
                                    checked={currentQuestion.correctOptions.includes(index)}
                                    onChange={() => handleCorrectOptionToggle(index)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddOption}>
                            Добавить вариант
                        </button>
                    </div>
                ) : (
                    <div className="input-group">
                        <label>Правильный ответ:</label>
                        <input
                            type="text"
                            value={currentQuestion.correctAnswer}
                            onChange={(e) => setCurrentQuestion(prev => ({ 
                                ...prev, 
                                correctAnswer: e.target.value 
                            }))}
                            placeholder="Введите правильный ответ"
                        />
                    </div>
                )}

                <button 
                    type="button" 
                    className="add-question-button"
                    onClick={handleAddQuestion}
                >
                    Добавить вопрос
                </button>
            </div>

            <div className="questions-list">
                <h3>Добавленные вопросы:</h3>
                {questions.map((question, index) => (
                    <div key={question.id} className="question-item">
                        <h4>Вопрос {index + 1}</h4>
                        <p>{question.text}</p>
                        <p>Тип: {question.type === 'closed' ? 'Закрытый' : 'Открытый'}</p>
                        <p>Категория: {question.category}</p>
                        <p>Подкатегория: {question.subCategory}</p>
                    </div>
                ))}
            </div>

            <button 
                type="button" 
                className="publish-button"
                onClick={handleSubmit}
                disabled={questions.length === 0}
            >
                Опубликовать
            </button>
        </div>
    );
};

export default TestQuestionsStep; 