import React, { useState } from 'react';
import './TestNameStep.css';

const TestNameStep = ({ onSubmit, initialValue = '' }) => {
    const [testName, setTestName] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (testName.trim()) {
            onSubmit(testName);
        }
    };

    return (
        <div className="test-name-step">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        placeholder="Введите имя теста"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="next-button"
                    disabled={!testName.trim()}
                >
                    Настроить доступ к тесту
                </button>
            </form>
        </div>
    );
};

export default TestNameStep; 