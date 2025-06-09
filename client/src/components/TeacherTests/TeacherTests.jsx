import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import LocalStorageService, { STORAGE_KEYS } from '../../services/localStorageService';
import TestCreationModal from '../TestCreation/TestCreationModal';
import TestResultsModal from './TestResultsModal';
import './TeacherTests.css';

const TeacherTests = () => {
    const { user } = useAuth();
    const [tests, setTests] = useState([]);
    const [showTestCreationModal, setShowTestCreationModal] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);

    useEffect(() => {
        loadTests();
    }, []);

    const loadTests = () => {
        const allTests = LocalStorageService.getItem(STORAGE_KEYS.TESTS, []);
        const teacherTests = allTests.filter(test => test.teacherId === user.id);
        setTests(teacherTests);
    };

    const handleViewResults = (test) => {
        setSelectedTest(test);
        setShowResultsModal(true);
    };

    const handleEditTest = (test) => {
        setSelectedTest(test);
    };

    const handleDeleteTest = (testId) => {
        const allTests = LocalStorageService.getItem(STORAGE_KEYS.TESTS, []);
        const updatedTests = allTests.filter(test => test.id !== testId);
        LocalStorageService.setItem(STORAGE_KEYS.TESTS, updatedTests);
        loadTests();
    };

    return (
        <div className="teacher-tests">
            <div className="tests-header">
                <div className="tests-info">
                    <h2>Тестирование студентов</h2>
                    <p>Вы создали тестов: {tests.length}</p>
                </div>
                <button 
                    className="create-test-button"
                    onClick={() => setShowTestCreationModal(true)}
                >
                    +
                </button>
            </div>

            <div className="tests-list">
                {tests.map(test => (
                    <div key={test.id} className="test-card">
                        <div className="test-info">
                            <h3>{test.title}</h3>
                            <p className="test-date">
                                {new Date(test.startDateTime).toLocaleDateString()} - 
                                {new Date(test.endDateTime).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="test-actions">
                            <button 
                                className="action-button results"
                                onClick={() => handleViewResults(test)}
                            >
                                Результаты
                            </button>
                            <button 
                                className="action-button edit"
                                onClick={() => handleEditTest(test)}
                            >
                                <span className="edit-icon">✎</span>
                            </button>
                            <button 
                                className="action-button delete"
                                onClick={() => handleDeleteTest(test.id)}
                            >
                                <span className="delete-icon">×</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showTestCreationModal && (
                <TestCreationModal
                    onClose={() => {
                        setShowTestCreationModal(false);
                        loadTests();
                    }}
                />
            )}

            {showResultsModal && selectedTest && (
                <TestResultsModal
                    test={selectedTest}
                    onClose={() => {
                        setShowResultsModal(false);
                        setSelectedTest(null);
                    }}
                />
            )}
        </div>
    );
};

export default TeacherTests; 