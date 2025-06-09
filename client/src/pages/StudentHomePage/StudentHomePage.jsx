import React from 'react'
import { useAuth } from '../../context/AuthContext'
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu'
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground'
import StudentCard from '../../UI/StudentCard/StudentCard'
import './StudentHomePage.css'

const StudentHomePage = () => {
  const { user } = useAuth()

  return (
    <div className='profile'>
      <StudentProfileMenu />
      <BackgroundProfile>
        <div className="student-content">
          <StudentCard />
        </div>
      </BackgroundProfile>
    </div>
  )
}

export default StudentHomePage
