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
        <div className="page-container">
            <TeacherProfileMenu />
            <div className="content-container">
                <div className="testing-header">
                    <h1>Тестирование студентов</h1>
                    <button className="add-test-button">
                        <span>+</span>
                    </button>
                </div>
                
                <div className="tests-info">
                    <p className="tests-count">Вы создали тестов: {testCount}</p>
                </div>

                <div className="tests-list">
                    <div className="test-card">
                        <div className="test-card-header">
                            <div className="test-author">Сергиенко О.В.</div>
                            <div className="test-actions">
                                <button className="action-button results">Результаты</button>
                                <button 
                                    className="action-button analysis"
                                    onClick={handleOpenAnalysisModal}
                                >
                                    Анализ на соответствие рынку
                                </button>
                                <button className="icon-button">
                                    <img src={EditIcon} alt="Edit" />
                                </button>
                                <button className="icon-button">
                                    <img src={DeleteIcon} alt="Delete" />
                                </button>
                            </div>
                        </div>
                        <h2 className="test-title">Проверка знаний</h2>
                        <div className="test-date">29.04.2024</div>
                        <p className="test-description">
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