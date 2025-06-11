import React, { useState } from 'react';
import './TeacherTestingPage.css';
import TeacherProfileMenu from '../../components/ProfileMenu/TeacherProfileMenu';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete_forever.svg';
import MarketAnalysisModal from '../../components/modals/MarketAnalysisModal/MarketAnalysisModal';

const TeacherTestingPage = () => {
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const testCount = 1; // Это можно будет получать из API

    const handleOpenAnalysisModal = () => {
        setIsAnalysisModalOpen(true);
    };

    const handleCloseAnalysisModal = () => {
        setIsAnalysisModalOpen(false);
    };

    return (
        <div className="teacher-page-container">
            <TeacherProfileMenu />
            <div className="teacher-content-container">
                <div className="teacher-testing-header">
                    <h1>Тестирование студентов</h1>
                    <button className="teacher-add-test-button">
                        <span>+</span>
                    </button>
                </div>
                
                <div className="teacher-tests-info">
                    <p className="teacher-tests-count">Вы создали тестов: {testCount}</p>
                </div>

                <div className="teacher-tests-list">
                    <div className="teacher-test-card">
                        <div className="teacher-test-card-header">
                            <div className="teacher-test-author">Сергиенко О.В.</div>
                            <div className="teacher-test-actions">
                                <button className="teacher-action-button results">Результаты</button>
                                <button 
                                    className="teacher-action-button analysis"
                                    onClick={handleOpenAnalysisModal}
                                >
                                    Анализ на соответствие рынку
                                </button>
                                <button className="teacher-icon-button">
                                    <img src={EditIcon} alt="Edit" />
                                </button>
                                <button className="teacher-icon-button">
                                    <img src={DeleteIcon} alt="Delete" />
                                </button>
                            </div>
                        </div>
                        <h2 className="teacher-test-title">Проверка знаний</h2>
                        <div className="teacher-test-date">29.04.2024</div>
                        <p className="teacher-test-description">
                            Оцените свои знания и укажите, какой предмет оказал наибольшее влияние на получение этих знаний
                        </p>
                    </div>
                </div>
            </div>

            <MarketAnalysisModal 
                isOpen={isAnalysisModalOpen} 
                onClose={handleCloseAnalysisModal}
            />
        </div>
    );
};

export default TeacherTestingPage; 