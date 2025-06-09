import React from 'react';
import TeacherProfileMenu from '../components/ProfileMenu/TeacherProfileMenu';
import BackgroundProfile from '../UI/shared/profileBackground/profileBackground';

const TeacherLayout = ({ children, header }) => {
  return (
    <div className='profile'>
      <TeacherProfileMenu />
      <BackgroundProfile>
        {header}
        <div className="admin-content">
          {children}
        </div>
      </BackgroundProfile>
    </div>
  );
};

export default TeacherLayout; 