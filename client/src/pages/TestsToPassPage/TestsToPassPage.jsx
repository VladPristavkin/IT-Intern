import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import './TestsToPassPage.css'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import AvailableTestCard from '../../components/TestCard/AvailableTestCard';
import TestModal from '../../components/modals/testPassing/TestModal';
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';

export default function TestsToPassPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestData, setSelectedTestData] = useState(null);
  const [testHistory, setTestHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // TODO: Replace with actual API call when backend is ready
    // For now using mock data
    const fetchTests = async () => {
      try {
        // Simulating API call
        const mockTests = [
          {
            id: 1,
            teacher: 'Сергиенко О.В.',
            testName: 'Проверка знаний',
            date: '29.04.2025',
            description: 'Оцените свои знания и укажите, какой предмет оказал наибольшее влияние на получение этих знаний'
          },
          {
            id: 2,
            teacher: 'Петров А.И.',
            testName: 'Основы программирования',
            date: '30.04.2025',
            description: 'Базовые концепции программирования и алгоритмизации'
          }
        ];
        setTestHistory(mockTests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tests:', error);
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleOpenTest = (testData) => {
    setSelectedTestData(testData);
    setTimeout(() => {
      setModalOpen(true);
    }, 820);
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Get user data from local DB
  const dbUser = db.getUserById(user.userId);
  
  // Redirect to home if user is not a student
  if (!dbUser || dbUser.role !== 'student') {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className='tests-pass'>
        <StudentProfileMenu />
        <BackgroundProfile>
          <ProfileHeader text="Прохождение тестирования" />
          <div className="loading-spinner">Загрузка тестов...</div>
        </BackgroundProfile>
      </div>
    );
  }

  return (
    <div className='tests-pass'>
      <StudentProfileMenu />
      <BackgroundProfile>
        <ProfileHeader text="Прохождение тестирования" />
        <div className="tests-counter-pass">
          Тестов для прохождения доступно: {testHistory.length}
        </div>
        <div className="tests-list">
          {testHistory.map(test => (
            <AvailableTestCard
              key={test.id}
              testId={test.id}
              teacher={test.teacher}
              testName={test.testName}
              date={test.date}
              description={test.description}
              onPassClick={() => handleOpenTest(test)}
            />
          ))}
        </div>
      </BackgroundProfile>

      <TestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        testData={selectedTestData}
      />
    </div>
  );
}