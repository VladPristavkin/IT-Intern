import React from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import TestCreation from '../../components/TestCreation/TestCreation';

const CreateTestPage = () => {
    return (
        <TeacherLayout>
            <ProfileHeader text="Создание теста" />
            <TestCreation />
        </TeacherLayout>
    );
};

export default CreateTestPage; 