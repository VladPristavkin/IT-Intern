import React from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import TeacherTests from '../../components/TeacherTests/TeacherTests';

const TeacherTestsPage = () => {
    return (
        <TeacherLayout>
            <ProfileHeader text="Мои тесты" />
            <TeacherTests />
        </TeacherLayout>
    );
};

export default TeacherTestsPage; 