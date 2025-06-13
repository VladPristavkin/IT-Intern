import React, { useState } from 'react';
import { TestTemplate } from '../../models';
import TestBasicForm from './TestBasicForm';
import TestAccessSettings from './TestAccessSettings';
import TestQuestionsForm from './TestQuestionsForm';
import db from '../../utils/localDb';

const TestConstructor = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [testTemplate, setTestTemplate] = useState(new TestTemplate());

    const handleBasicInfoSubmit = (basicInfo) => {
        setTestTemplate(prev => ({ ...prev, ...basicInfo }));
        setCurrentStep(1);
    };

    const handleAccessSettingsSubmit = (accessSettings) => {
        setTestTemplate(prev => ({ ...prev, ...accessSettings }));
        setCurrentStep(2);
    };

    const handleQuestionsSubmit = (questions) => {
        setTestTemplate(prev => ({ ...prev, questions }));
    };

    const handlePublish = () => {
        // Сохраняем тест в localDb
        const savedTest = db.insert('tests', testTemplate);
        
        // Сохраняем вопросы
        testTemplate.questions.forEach(question => {
            const savedQuestion = db.insert('questions', {
                ...question,
                testTemplateId: savedTest.id
            });

            // Для закрытых вопросов сохраняем варианты ответов
            if (question.options) {
                question.options.forEach(option => {
                    db.insert('answerOptions', {
                        ...option,
                        questionId: savedQuestion.id
                    });
                });
            }
        });

        onClose();
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <TestBasicForm 
                    initialData={testTemplate}
                    onSubmit={handleBasicInfoSubmit}
                />;
            case 1:
                return <TestAccessSettings
                    initialData={testTemplate}
                    onSubmit={handleAccessSettingsSubmit}
                />;
            case 2:
                return <TestQuestionsForm
                    initialData={testTemplate}
                    onSubmit={handleQuestionsSubmit}
                    onPublish={handlePublish}
                />;
            default:
                return null;
        }
    };

    return (
        <div className="test-constructor">
            <h1>Конструктор тестов</h1>
            {renderStep()}
        </div>
    );
};

export default TestConstructor; 