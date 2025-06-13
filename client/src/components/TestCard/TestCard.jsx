import React from 'react';
import './TestCard.css';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete_forever.svg';

const TestCard = ({ test, onEdit, onDelete, onAnalysis }) => {
    return (
        <div className="teacher-test-card">
            <div className="teacher-test-card-header">
                <div className="teacher-test-author">{test.author}</div>
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
            <h2 className="teacher-test-title">{test.title}</h2>
            <div className="teacher-test-date">{test.date}</div>
            <p className="teacher-test-description">
                {test.description}
            </p>
        </div>
    );
};

export default TestCard;