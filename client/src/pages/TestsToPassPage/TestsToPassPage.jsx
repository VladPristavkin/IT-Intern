import React, { useState } from 'react'
import './TestsToPassPage.css'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import TestCard from '../../components/TestCard/TestCard';
import TestModal from '../../components/modals/testPassing/TestModal';

export default function TestsToPassPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestData, setSelectedTestData] = useState(null);
    const testHistory = [
        {
           id: 1,
           teacher: 'Сергиенко О.В.',
           testName: 'Проверка знаний',
           date: '29.04.2025',
           description: 'Оцените свои знания и укажите, какой предмет оказал наибольшее влияние на получение этих знаний'
         },
        // Другие записи истории прохождения тестов
      ];

  const handleOpenTest = (testData) => {
    setSelectedTestData(testData);
    // setModalOpen(true);
    setTimeout(() => {
    setModalOpen(true);
  }, 820); // 7000 мс = 7 секунд
  }

  return (
    <div className='tests'>
      <StudentProfileMenu />
      <BackgroundProfile>
        <ProfileHeader text="Прохождение тестирования" />
        <div className="tests-counter">
            Тестов для прохождения доступно: {testHistory.length}
        </div>
        {testHistory.map(test => (
          <TestCard
            key={test.id}
            testId={test.id}
            teacher={test.teacher}
            testName={test.testName}
            date={test.date}
            description={test.description}
            onPassClick={() => handleOpenTest(test)}
          />
        ))}
      </ BackgroundProfile>

      <TestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        testData={selectedTestData}
        />
    </div>
  );
}