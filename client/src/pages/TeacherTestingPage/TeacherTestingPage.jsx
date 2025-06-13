import React, { useState, useEffect } from 'react';
import './TeacherTestingPage.css';
import TeacherProfileMenu from '../../components/ProfileMenu/TeacherProfileMenu';
import MarketAnalysisModal from '../../components/modals/MarketAnalysisModal/MarketAnalysisModal';
import TestConstructorModal from '../../components/TestConstructorModal/TestConstructorModal';
import TestCard from '../../components/TestCard/TestCard';
import db from '../../utils/localDb'; 
import { v4 as uuidv4 } from 'uuid';

const TeacherTestingPage = () => {
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [tests, setTests] = useState([]);


    useEffect(() => {
        // Load tests from localStorage
        const loadTests = () => {
            const savedTests = db.getAll('testTemplates');
            if (savedTests) {
                setTests(savedTests);
            }
        };
        
        loadTests();
    }, []);


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
    

    const handleDeleteTest = (testId) => {
        const updatedTests = tests.filter(test => test.id !== testId);
        setTests(updatedTests);
        db.delete('testTemplates', testId);
    };

    const saveTest = (testData) => {
        let updatedTests;
        if (isEditing) {
            updatedTests = tests.map(test => 
                test.id === testData.id ? testData : test
            );
        } else {
            const newTest = {
                ...testData,
                id: uuidv4(),
                date: new Date().toLocaleDateString('ru-RU')
            };
            updatedTests = [...tests, newTest];
            db.insert('testTemplates', newTest);
        }
        setTests(updatedTests);
        handleCloseModal();
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
                <p className="teacher-tests-count">Вы создали тестов: {tests.length}</p>
                </div>

                <div className="teacher-tests-list">
                {tests.map(test => (
                        <TestCard
                            key={test.id}
                            test={test}
                            onEdit={handleOpenModal}
                            onDelete={handleDeleteTest}
                            onAnalysis={handleOpenAnalysisModal}
                        />
                    ))}
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
                onSave={saveTest}
            />
        </div>
    );
};

export default TeacherTestingPage; 