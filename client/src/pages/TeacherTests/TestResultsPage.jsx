import React from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import TestResults from '../../components/TestResults/TestResults';

const TestResultsPage = () => {
    return (
        <TeacherLayout>
            <ProfileHeader text="Результаты тестов" />
            <TestResults />
        </TeacherLayout>
    );
};

export default TestResultsPage; 