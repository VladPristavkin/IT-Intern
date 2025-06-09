import React, { useState } from 'react';
import LocalStorageService, { STORAGE_KEYS } from '../../services/localStorageService';
import './TestResultsModal.css';

const TestResultsModal = ({ test, onClose }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const testResults = LocalStorageService.getItem(STORAGE_KEYS.TEST_RESULTS, [])
        .filter(result => result.testId === test.id);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ru-RU');
    };

    const calculateScore = (answers) => {
        const totalQuestions = test.questions.length;
        const correctAnswers = answers.filter(answer => {
            const question = test.questions.find(q => q.id === answer.questionId);
            if (question.type === 'closed') {
                return JSON.stringify(answer.selectedOptions.sort()) === JSON.stringify(question.correctOptions.sort());
            } else {
                return answer.answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
            }
        }).length;

        return Math.round((correctAnswers / totalQuestions) * 100);
    };

    return (
        <div className="test-results-modal">
            <div className="modal-content">
                <h2>Результаты теста "{test.title}"</h2>
                
                <div className="results-container">
                    <div className="students-list">
                        {testResults.map(result => (
                            <div 
                                key={result.id}
                                className={`student-result-item ${selectedStudent?.id === result.id ? 'selected' : ''}`}
                                onClick={() => setSelectedStudent(result)}
                            >
                                <div className="student-info">
                                    <h3>{result.studentName}</h3>
                                    <p className="completion-date">{formatDate(result.completedAt)}</p>
                                </div>
                                <div className="score">
                                    {calculateScore(result.answers)}%
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedStudent && (
                        <div className="detailed-results">
                            <h3>Детальные результаты</h3>
                            {test.questions.map((question, index) => {
                                const answer = selectedStudent.answers.find(a => a.questionId === question.id);
                                const isCorrect = question.type === 'closed'
                                    ? JSON.stringify(answer.selectedOptions.sort()) === JSON.stringify(question.correctOptions.sort())
                                    : answer.answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();

                                return (
                                    <div key={question.id} className={`question-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                                        <h4>Вопрос {index + 1}</h4>
                                        <p className="question-text">{question.text}</p>
                                        <div className="answer-details">
                                            {question.type === 'closed' ? (
                                                <>
                                                    <p>Выбранные ответы:</p>
                                                    <ul>
                                                        {answer.selectedOptions.map(optionIndex => (
                                                            <li key={optionIndex}>{question.options[optionIndex]}</li>
                                                        ))}
                                                    </ul>
                                                    <p>Правильные ответы:</p>
                                                    <ul>
                                                        {question.correctOptions.map(optionIndex => (
                                                            <li key={optionIndex}>{question.options[optionIndex]}</li>
                                                        ))}
                                                    </ul>
                                                </>
                                            ) : (
                                                <>
                                                    <p>Ответ студента: {answer.answer}</p>
                                                    <p>Правильный ответ: {question.correctAnswer}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <button className="close-button" onClick={onClose}>✕</button>
            </div>
        </div>
    );
};

export default TestResultsModal; 