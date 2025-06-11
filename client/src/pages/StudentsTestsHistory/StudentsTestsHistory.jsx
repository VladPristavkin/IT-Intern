import React from 'react'
import './StudentsTestsHistory.css'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import TestHistoryCard from '../../components/TestHistoryCard/TestHistoryCard';

export default function StudentsTestsHistory() {
  // Массив истории прохождения тестов
  const testHistory = [
    {
      id: 1,
      teacher: 'Сергиенко О.В.',
      testName: 'Проверка знаний',
      date: '29.04.2024',
      description: 'Оцените свои знания и укажите, какой предмет оказал наибольшее влияние на получение этих знаний'
    },
    // {
    //   id: 2,
    //   teacher: 'Вайнилович Ю.В.',
    //   testName: 'Тест по JavaScript',
    //   date: '12.03.2024',
    //   description: 'Пройдите тест, чтобы оценить ваши знания в области JavaScript и веб-разработки'
    // }
  ];

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
          />
        ))}
      </ BackgroundProfile>
    </div>
  );
}