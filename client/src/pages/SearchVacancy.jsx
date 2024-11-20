import React from 'react';
import Header from '../UI/shared/header/Header';
import HeaderMain from '../components/mainHeader/HeaderMain';
import VacancyListNormal from '../components/vacancy/VacancyListNormal';
import LeftBarFilter from '../components/LeftBarFilter/LeftBarFilter';
import RightSideBar from '../components/RightSideBar/RightSideBar';

const PageSearch = () => {
  return (
    <div className='background'>
      <Header />
      <HeaderMain />
      <div className='main-page-content' style={{ display: 'flex', justifyContent: 'space-between'}}>
        <LeftBarFilter />
        <VacancyListNormal />
        <RightSideBar />
      </div>
    </div>
  );
};

export default PageSearch;

