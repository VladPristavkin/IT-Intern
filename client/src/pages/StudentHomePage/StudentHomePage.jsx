import React from 'react'
import './StudentHomePage.css'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import StudentCard from '../../UI/StudentCard/StudentCard';

const userData = {
  username: "VladPristavkin",
  userRole: "Студент"
};

export default function StudentHomePage() {
  return (
    <div className='profile'>
      <StudentProfileMenu userData={userData} />
      <BackgroundProfile>
        <ProfileHeader text="Информация о пользователе" />
        <StudentCard/>
      </ BackgroundProfile>
    </div>
  );
}
