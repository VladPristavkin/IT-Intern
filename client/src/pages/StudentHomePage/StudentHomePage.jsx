import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import './StudentHomePage.css'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import StudentCard from '../../UI/StudentCard/StudentCard';
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';

export default function StudentHomePage() {
  const { user, isAuthenticated } = useContext(AuthContext);

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Get user data from local DB
  const dbUser = db.getUserById(user.userId);
  
  // Redirect to home if user is not a student
  if (!dbUser || dbUser.role !== 'student') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='profile'>
      <StudentProfileMenu />
      <BackgroundProfile>
        <ProfileHeader text="Информация о пользователе" />
        <StudentCard/>
      </BackgroundProfile>
    </div>
  );
}
