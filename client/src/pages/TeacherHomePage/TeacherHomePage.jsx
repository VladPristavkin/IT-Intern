import React from 'react';
import { useAuth } from '../../context/AuthContext';
import TeacherLayout from '../../layouts/TeacherLayout';
import TeacherCard from '../../UI/TeacherCard/TeacherCard';
import './TeacherHomePage.css';

const TeacherHomePage = () => {
  const { user } = useAuth();

  return (
    <TeacherLayout>
      <div className="teacher-content">
        <TeacherCard />
      </div>
    </TeacherLayout>
  );
};

export default TeacherHomePage; 