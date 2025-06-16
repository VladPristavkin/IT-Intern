import React, { useState } from 'react';
import Header from '../UI/shared/header/Header';
import HeaderMain from '../components/mainHeader/HeaderMain';
import VacancyListNormal from '../components/vacancy/VacancyListNormal';
import LeftBarFilter from '../components/LeftBarFilter/LeftBarFilter';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import './SearchVacancy.css';

const PageSearch = () => {
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
    <div className="background">
      <Header />
      <HeaderMain />
      <div className="main-page-content">
        <div className="content-wrapper">
          <LeftBarFilter onFiltersChange={handleFiltersChange} />
          <VacancyListNormal filters={filters} />
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default PageSearch;

