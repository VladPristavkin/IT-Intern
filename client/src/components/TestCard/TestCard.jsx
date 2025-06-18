import React from 'react';
import './TestCard.css';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete_forever.svg';

const TestCard = ({ test, onEdit, onDelete, onAnalysis }) => {
                                console.log(test.createdAt.split('T')[0]);
    return (
        <div className="test-history-card">
            <div className="card-top">
                <div className="test-info">
                    <h3 className="teacher-name">{test.teacherName}</h3>
                    <h3 className="test-name">{test.title}</h3>
                    <div className="test-date">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                            <div className="test-date">{test.createdAt.split('T')[0]}</div>
                    </div>
                </div>
                <div className="teacher-test-actions">
                    <button className="teacher-action-button results">Результаты</button>
                    <button 
                        className="teacher-action-button analysis"
                        onClick={onAnalysis}
                    >
                        Анализ
                    </button>
                    <button className="teacher-icon-button" onClick={() => onEdit(test)}>
                        <img src={EditIcon} alt="Edit" />
                    </button>
                    <button className="teacher-icon-button" onClick={() => onDelete(test.id)}>
                        <img src={DeleteIcon} alt="Delete" />
                    </button>
                </div>
            </div>
            <p className="test-description">
                {test.description}
            </p>
        </div>
    );
};

export default TestCard;