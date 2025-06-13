import React, { useState } from 'react';
import './TeacherTestingPage.css';
import TeacherProfileMenu from '../../components/ProfileMenu/TeacherProfileMenu';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete_forever.svg';
import MarketAnalysisModal from '../../components/modals/MarketAnalysisModal/MarketAnalysisModal';
import TestConstructorModal from '../../components/TestConstructorModal/TestConstructorModal';

const TeacherTestingPage = () => {
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const testCount = 1; // Это можно будет получать из API

    const handleOpenAnalysisModal = () => {
        setIsAnalysisModalOpen(true);
    };

    const handleCloseAnalysisModal = () => {
        setIsAnalysisModalOpen(false);
    };

    const handleOpenModal = (test = null) => {
        setSelectedTest(test);
        setIsEditing(!!test);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTest(null);
        setIsEditing(false);
    };
    const test = {
        author: 'Сергиенко О.В.',
        title: 'Проверка знаний',
        date: '29.04.2024',
        description: 'Оцените свои знания и укажите, какой предмет оказал наибольшее влияние на получение этих знаний'
      };
    return (
        <div className="teacher-page-container">
            <TeacherProfileMenu />
            <div className="teacher-content-container">
                <div className="teacher-testing-header">
                    <h1>Тестирование студентов</h1>
                    <button className="teacher-add-test-button" onClick={() => handleOpenModal()}>
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
                                    Анализ
                                </button>
                                <button className="teacher-icon-button" onClick={() => handleOpenModal(test)}>
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

            <TestConstructorModal
                open={isModalOpen}
                onClose={handleCloseModal}
                isEditing={isEditing}
                testData={selectedTest}
            />
        </div>
    );
};

export default TeacherTestingPage; 