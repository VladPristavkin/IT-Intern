import React from 'react'
import './SuggedtedVacanciesPage.css'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
// import VacancyListSaved from '../../components/vacancy/VacancyListSaved';
import SuggestedVacanciesList from '../../components/vacancy/SuggestedVacanciesList';

export default function SuggestedVacanciesPage() {
  return (
    <div className='profile'>
      <StudentProfileMenu />
      <BackgroundProfile>
        <ProfileHeader text="Вакансии для вас" />
        <SuggestedVacanciesList/>
      </ BackgroundProfile>
    </div>
  );
}
