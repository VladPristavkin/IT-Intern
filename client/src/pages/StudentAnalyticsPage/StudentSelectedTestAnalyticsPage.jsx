import React from 'react'
import './StudentAnalyticsPage.css'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import StudentTestAnalytics from '../../components/StudentTestAnalytics/StudentTestAnalytics';

export default function StudentSelectedTestAnalyticsPage() {
  return (
    <div className='analytics'>
      <StudentProfileMenu />
      <BackgroundProfile>
        <ProfileHeader text="Статистика знаний" />
        <StudentTestAnalytics/>
      </ BackgroundProfile>
    </div>
  );
}
