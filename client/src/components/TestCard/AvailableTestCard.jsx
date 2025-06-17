import React from 'react';
import './TestCard.css';
import { Calendar } from 'lucide-react';

const AvailableTestCard = ({ testId, teacher, testName, date, description, onPassClick }) => {
    return (
        <div className="test-card">
            <div className="test-card-header">
                <div className="test-card-icon">IT</div>
                <div className="test-card-info">
                    <h3 className="test-card-title">{testName}</h3>
                    <div className="test-card-meta">
                        <Calendar className="icon-small" />
                        <span>{date}</span>
                        <span className="separator">•</span>
                        <span>{teacher}</span>
                    </div>
                </div>
            </div>
            <p className="test-card-description">{description}</p>
            <div className="test-card-actions">
                <button onClick={() => onPassClick({ id: testId, testName, teacher, date, description })} className="btn btn-primary">
                    Пройти тест
                </button>
            </div>
        </div>
    );
};

export default AvailableTestCard; 