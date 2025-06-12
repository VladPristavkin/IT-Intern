import React, { useState } from 'react'
import './StudentsTestsHistory.css'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import TestHistoryCard from '../../components/TestHistoryCard/TestHistoryCard';
import TestAnswersView from '../../components/TestAnswersView/TestAnswersView';

export default function StudentsTestsHistory() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestData, setSelectedTestData] = useState(null); // если ты будешь использовать реальные данные

  // Массив истории прохождения тестов
  const testHistory = [
    {
      id: 1,
      teacher: 'Сергиенко О.В.',
      testName: 'Проверка знаний',
      date: '09.06.2025',
      description: 'Оцените свои знания и укажите, какой предмет оказал наибольшее влияние на получение этих знаний'
    },
  ];

  const handleOpenAnswers = (testData) => {
    setSelectedTestData(testData); // если понадобится
    setModalOpen(true);
  };

  return (
    <div className='tests-history'>
      <StudentProfileMenu />
      <BackgroundProfile>
        <ProfileHeader text="История прохождения тестирований" />
        <div className="tests-counter">
          Тестов пройдено: {testHistory.length}
        </div>
        {testHistory.map(test => (
          <TestHistoryCard
            key={test.id}
            testId={test.id}
            teacher={test.teacher}
            testName={test.testName}
            date={test.date}
            description={test.description}
            onAnswersClick={() => handleOpenAnswers(test)}
          />
        ))}
      </ BackgroundProfile>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <TestAnswersView
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              testData={selectedTestData}
            />
          </div>
        </div>
      )}
    </div>
  );
}