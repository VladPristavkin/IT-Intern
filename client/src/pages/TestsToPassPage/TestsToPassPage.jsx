import React from 'react'
import './TestsToPassPage.css'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import TestCard from '../../components/TestCard/TestCard';

export default function TestsToPassPage() {
    const testHistory = [
        // {
        //   id: 1,
        //   teacher: 'Сергиенко О.В.',
        //   testName: 'Проверка знаний',
        //   date: '29.04.2024',
        //   description: 'Оцените свои знания и укажите, какой предмет оказал наибольшее влияние на получение этих знаний'
        // },
        // Другие записи истории прохождения тестов
      ];

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
          />
        ))}
      </ BackgroundProfile>
    </div>
  );
}