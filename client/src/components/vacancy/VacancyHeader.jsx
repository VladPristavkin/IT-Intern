import React from 'react';
import './VacancyHeader.css';
import RussianFlag from '../../assets/Russia-icon.svg'; 
import BelorussianFlag from '../../assets/Belarus-icon.svg';
import SaveIcon from '../../assets/Save.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const VacancyHeader = ({ vacancy }) => {
  const { name, salary, employer, country, originalVacancyUrl } = vacancy;

  const getFlag = (countryName) => {
    switch (countryName) {
      case 'Россия':
        return RussianFlag;
      case 'Беларусь':
        return BelorussianFlag;
      default:
        return null;
    }
  };

  const formatSalary = (salary) => {
    if (salary?.from != null && salary.from !== 0) {
      return salary.to != null ? `от ${salary.from} до ${salary.to} ${salary.currency || ''}` : `от ${salary.from} ${salary.currency || ''}`;
    } else if (salary?.to != null) {
      return `до ${salary.to} ${salary.currency || ''}`;
    } else {
      return 'Зарплата не указана';
    }
  };

  const handleApplyClick = () => {
    if (originalVacancyUrl) {
      window.open(originalVacancyUrl, '_blank');
    } else {
      alert('Ссылка на оригинальную вакансию недоступна');
    }
  };

  return (
    <div className="vacancy-header-full">
      <div className="header-content">
        <div className="company-info">
          <img src={getFlag(country?.name)} alt={`${country?.name} Flag`} className="country-flag" />
          <h2 className='employer-name-header'>{employer?.name || 'Не указано'}</h2>
        </div>
        <h1 className="job-title">{name || 'Не указано'}</h1>
        <p className="salary">{formatSalary(salary)}</p>
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


