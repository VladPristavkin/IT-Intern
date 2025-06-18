import React, { useState, useEffect } from 'react';
import './TeacherTestingPage.css';
import TeacherProfileMenu from '../../components/ProfileMenu/TeacherProfileMenu';
import MarketAnalysisModal from '../../components/modals/MarketAnalysisModal/MarketAnalysisModal';
import TestConstructorModal from '../../components/TestConstructorModal/TestConstructorModal';
import TestCard from '../../components/TestCard/TestCard';
import db from '../../utils/localDb'; 
import { v4 as uuidv4 } from 'uuid';
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';

const TeacherTestingPage = () => {
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [tests, setTests] = useState([]);

    useEffect(() => {
        // Load tests from localStorage
        const loadTests = () => {
            const savedTests = db.getAll('testTemplates') || [];
            setTests(savedTests);
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

    const handleCloseModal = (testData = null) => {
        if (testData) {
            const isNewTest = !testData.id || !tests.some(t => t.id === testData.id);
            
            if (isNewTest) {
                // Create new test
                const savedTest = db.insert('testTemplates', testData);
                setTests(prev => [...prev, savedTest]);
            } else {
                // Update existing test
                db.update('testTemplates', testData.id, testData);
                setTests(prev => prev.map(test => 
                    test.id === testData.id ? testData : test
                ));
            }
        }
        setIsModalOpen(false);
        setSelectedTest(null);
        setIsEditing(false);
    };

    const handleDeleteTest = (testId) => {
        db.delete('testTemplates', testId);
        setTests(prev => prev.filter(test => test.id !== testId));
    };

    return (
        <div className="teacher-page-container">
            <TeacherProfileMenu />
            {/* <div className="teacher-content-container"> */}
                <BackgroundProfile>
                    <div className="teacher-testing-header">
                        <ProfileHeader text="Тестирование студентов" />
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
                </BackgroundProfile>
            <MarketAnalysisModal 
                isOpen={isAnalysisModalOpen} 
                onClose={handleCloseAnalysisModal}
            />
            <TestConstructorModal
                open={isModalOpen}
                onClose={handleCloseModal}
                testData={selectedTest}
            />
        </div>
        // </div>
    );
};

export default TeacherTestingPage; 