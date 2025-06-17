import React from 'react';
import './VacancyHeader.css';
import RussianFlag from '../../assets/flags/ru.svg'; 
import BelarusFlag from '../../assets/flags/by.png';
import SaveIcon from '../../assets/Save.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const VacancyHeader = ({ vacancy }) => {
  const { 
    name, 
    salaryFrom, 
    salaryTo, 
    currency,
    employer,
    area,
    originVacancyUri, 
    originalVacancyUri,
    originalVacancyUrl 
  } = vacancy;

  const getFlag = (countryName) => {
    switch (countryName?.toLowerCase()) {
      case 'россия':
        return RussianFlag;
      case 'беларусь':
        return BelarusFlag;
      default:
        return null;
    }
  };

  const formatSalary = () => {
    if (!salaryFrom && !salaryTo) {
      return 'Зарплата не указана';
    }
    const curr = currency || '';
    
    if (salaryFrom && salaryTo) {
      return `от ${salaryFrom} до ${salaryTo} ${curr}`;
    }
    if (salaryFrom) {
      return `от ${salaryFrom} ${curr}`;
    }
    if (salaryTo) {
      return `до ${salaryTo} ${curr}`;
    }
    return 'Зарплата не указана';
  };

  const handleApplyClick = () => {
    const vacancyLink = originVacancyUri || originalVacancyUri || originalVacancyUrl;
    if (vacancyLink) {
      window.open(vacancyLink, '_blank');
    } else {
      alert('Ссылка на оригинальную вакансию недоступна');
    }
  };

  return (
    <div className="vacancy-header-full">
      <div className="header-content">
        <div className="company-info">
          {area?.country?.name && (
            <img src={getFlag(area.country.name)} alt={`${area.country.name} Flag`} className="header-country-flag" />
          )}
          <h2 className='employer-name-header'>{employer?.name || 'Не указано'}</h2>
        </div>
        <h1 className="job-title">{name || 'Не указано'}</h1>
        <p className="salary">{formatSalary()}</p>
      </div>
      <div className="vacancy-buttons">
        <img src={SaveIcon} alt="Save Icon" className="save-icon" />
        <button className="apply-button" onClick={handleApplyClick}>
          Откликнуться <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
};

export default VacancyHeader;


