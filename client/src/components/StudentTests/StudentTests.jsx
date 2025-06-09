import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import LocalStorageService, { STORAGE_KEYS } from '../../services/localStorageService';
import './StudentTests.css';

const StudentTests = () => {
    const { user } = useAuth();
    const [availableTests, setAvailableTests] = useState([]);
    const [completedTests, setCompletedTests] = useState([]);

    useEffect(() => {
        const loadTests = () => {
            const allTests = LocalStorageService.getItem(STORAGE_KEYS.TESTS, []);
            const testResults = LocalStorageService.getItem(STORAGE_KEYS.TEST_RESULTS, []);
            const now = new Date();

            // Filter tests that are currently active and not completed by the student
            const activeTests = allTests.filter(test => {
                const startDate = new Date(test.startDateTime);
                const endDate = new Date(test.endDateTime);
                const isCompleted = testResults.some(result => 
                    result.testId === test.id && result.studentId === user.id
                );

                return startDate <= now && endDate >= now && !isCompleted;
            });

            // Filter tests that have been completed by the student
            const studentCompletedTests = allTests.filter(test => {
                return testResults.some(result => 
                    result.testId === test.id && result.studentId === user.id
                );
            });

            setAvailableTests(activeTests);
            setCompletedTests(studentCompletedTests);
        };

        loadTests();
        // Add event listener for storage changes
        window.addEventListener('storage', loadTests);

        return () => {
            window.removeEventListener('storage', loadTests);
        };
    }, [user.id]);

    const startTest = (testId) => {
        // Navigate to test taking page
        window.location.href = `/student/test/${testId}`;
    };

    const viewResults = (testId) => {
        // Navigate to test results page
        window.location.href = `/student/test-results/${testId}`;
    };

    return (
        <div className="student-tests">
            <div className="tests-header">
                <h2>Доступные тесты</h2>
                <p>Активных тестов: {availableTests.length}</p>
            </div>

            {availableTests.length > 0 && (
                <div className="tests-list">
                    {availableTests.map(test => (
                        <div key={test.id} className="test-card">
                            <div className="test-card-header">
                                <h3>{test.title}</h3>
                                <span className="test-teacher">
                                    {test.teacherName}
                                </span>
                            </div>
                            <div className="test-card-info">
                                <p>Период проведения:</p>
                                <p>{new Date(test.startDateTime).toLocaleString()} - {new Date(test.endDateTime).toLocaleString()}</p>
                            </div>
                            <div className="test-card-footer">
                                <button 
                                    className="start-test-button"
                                    onClick={() => startTest(test.id)}
                                >
                                    Начать тест
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {completedTests.length > 0 && (
                <>
                    <div className="tests-header completed">
                        <h2>Завершенные тесты</h2>
                        <p>Пройдено тестов: {completedTests.length}</p>
                    </div>
                    <div className="tests-list">
                        {completedTests.map(test => (
                            <div key={test.id} className="test-card completed">
                                <div className="test-card-header">
                                    <h3>{test.title}</h3>
                                    <span className="test-teacher">
                                        {test.teacherName}
                                    </span>
                                </div>
                                <div className="test-card-info">
                                    <p>Дата прохождения:</p>
                                    <p>{new Date(test.endDateTime).toLocaleDateString()}</p>
                                </div>
                                <div className="test-card-footer">
                                    <button 
                                        className="view-results-button"
                                        onClick={() => viewResults(test.id)}
                                    >
                                        Просмотреть результаты
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {availableTests.length === 0 && completedTests.length === 0 && (
                <div className="no-tests">
                    <p>На данный момент нет доступных тестов</p>
                </div>
            )}
        </div>
    );
};

export default StudentTests; 