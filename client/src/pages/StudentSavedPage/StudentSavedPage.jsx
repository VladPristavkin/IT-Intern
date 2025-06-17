import React from 'react'
import './StudentSavedPage.css'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import VacancyListSaved from '../../components/vacancy/VacancyListSaved';

export default function StudentSavedPage() {
  return (
    <div className='profile'>
      <StudentProfileMenu />
      <BackgroundProfile>
        <ProfileHeader text="Сохранённые вакансии" />
        <VacancyListSaved/>
      </ BackgroundProfile>
    </div>
  );
}
