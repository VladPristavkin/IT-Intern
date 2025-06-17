import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../UI/shared/header/Header';
import HeaderMain from '../components/mainHeader/HeaderMain';
import VacancyListNormal from '../components/vacancy/VacancyListNormal';
import LeftBarFilter from '../components/LeftBarFilter/LeftBarFilter';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import './SearchVacancy.css';

const PageSearch = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    salary: '',
    employment: [],
    country: '',
    area: [],
    experience: [],
    schedule: [],
    specialization: [],
  });

  const [searchParams, setSearchParams] = useState({
    searchText: '',
    country: ''
  });

  // Обработчик изменения фильтров из LeftBarFilter
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Синхронизируем страну с поиском
    setSearchParams(prev => ({
      ...prev,
      country: newFilters.country || ''
    }));
  };

  // Обработчик поиска из HeaderMain
  const handleSearch = (params) => {
    setSearchParams(params);
    // Синхронизируем страну с фильтрами
    setFilters(prev => ({
      ...prev,
      country: params.country || ''
    }));
    
    // Обновляем URL без параметров
    navigate('/search', { replace: true });
  };

  return (
    <div className="background">
      <Header />
      <HeaderMain 
        onSearch={handleSearch}
        initialCountry={searchParams.country}
        initialSearchText={searchParams.searchText}
      />
      <div className="main-page-content">
        <div className="content-wrapper">
          <LeftBarFilter 
            onFiltersChange={handleFiltersChange} 
            initialCountry={searchParams.country}
          />
          <VacancyListNormal 
            filters={filters} 
            searchText={searchParams.searchText}
          />
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default PageSearch;

