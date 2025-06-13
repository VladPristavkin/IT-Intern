import React from 'react';
import './TeacherManagementCard.css';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete_forever.svg';

const TeacherManagementCard = ({ teacher, onEdit, onDelete }) => {
    return (
        <div className="teacher-management-card">
            <div className="teacher-management-card-header">
                <div className="teacher-management-info">
                    <h3 className="teacher-management-name">{teacher.name}</h3>
                    <p className="teacher-management-department">{teacher.department}</p>
                </div>
                <div className="teacher-management-actions">
                    <button 
                        className="teacher-management-icon-button" 
                        onClick={() => onEdit(teacher)}
                    >
                        <img src={EditIcon} alt="Edit" />
                    </button>
                    <button 
                        className="teacher-management-icon-button" 
                        onClick={() => onDelete(teacher.userId)}
                    >
                        <img src={DeleteIcon} alt="Delete" />
                    </button>
                </div>
            </div>
            <div className="teacher-management-details">
                <div className="teacher-management-detail">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{teacher.email}</span>
                </div>
                <div className="teacher-management-detail">
                    <span className="detail-label">Username:</span>
                    <span className="detail-value">{teacher.username}</span>
                </div>
            </div>
        </div>
    );
};

export default TeacherManagementCard; 