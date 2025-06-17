import React, { useState } from 'react'
import Header from '../../UI/shared/header/Header'
import HeaderMain from '../../components/mainHeader/HeaderMain'
import VacancyListNormal from '../../components/vacancy/VacancyListNormal'
import LeftBarFilter from '../../components/LeftBarFilter/LeftBarFilter'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import BackgroundComplex from '../../UI/shared/background/BackgroundComplex'
import './PageMain.css'

export default function PageMain() {
  const [filters, setFilters] = useState({
    salary: '',
    employment: [],
    country: '',
    area: [],
    experience: [],
    schedule: [],
    specialization: [],
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className='background'>
    <BackgroundComplex>
      <Header />
      <HeaderMain />
    </BackgroundComplex>
      <div className='main-page-content-main'>
        <LeftBarFilter onFiltersChange={handleFiltersChange} />
        <VacancyListNormal filters={filters} />
        <RightSideBar />
      </div>
    </div>
  )
}
