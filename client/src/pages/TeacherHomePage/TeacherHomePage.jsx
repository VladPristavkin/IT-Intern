import React from 'react'
import TeacherProfileMenu from '../../components/ProfileMenu/TeacherProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import TeacherCard from '../../UI/TeacherCard/TeacherCard';

const userData = {
  username: "SuckMaster",
  userRole: "Преподаватель"
};

export default function TeacherHomePage() {
  return (
    <div className='profile'>
      <TeacherProfileMenu userData={userData} />
      <BackgroundProfile>
        <ProfileHeader text="Информация о преподавателе" />
        <TeacherCard/>
      </ BackgroundProfile>
    </div>
  );
}