import React from 'react';
import { Link } from 'react-router-dom';
import './TestHistoryCard.css';

const TestHistoryCard = ({ teacher, testName, date, description, testId, onAnswersClick }) => {
    return (
        <div className="test-history-card">
            <div className="card-top">
                <div className="test-info">
                    <h3 className="teacher-name">{teacher}</h3>
                    <h2 className="test-name">{testName}</h2>
                    <div className="test-date">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{date}</span>
                    </div>
                </div>

                <div className="test-actions">
                    
                    <button onClick={onAnswersClick} className="action-button analytics--button">
                        Ответы
                    </button>
                    <Link to={`/student/tests/analytics/${testId}`} className="action-button analytics-button">
                        Статистика
                    </Link>
                </div>
            </div>

            <p className="test-description">{description}</p>
        </div>
    );
};

export default TestHistoryCard;
