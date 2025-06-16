import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VacancyCardNormal.css';
import RussianFlag from '../../assets/flags/ru.svg';
import BelarusFlag from '../../assets/flags/by.svg';
import LocationIcon from '../../assets/MapPin.svg';
import SalaryIcon from '../../assets/Money.svg';
import CalendarIcon from '../../assets/CalendarBlank.svg';

const VacancyCardNormal = ({ vacancy, isLoading }) => {
  const navigate = useNavigate();
  const { 
    id,
    name,
    employer,
    area,
    publishedAt,
    description,
    salaryFrom,
    salaryTo,
    currency
  } = vacancy;

  const handleClick = () => {
    navigate(`/vacancies/${id}`);
  };

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
    if (!salaryFrom && !salaryTo) return 'Не указано';
    const curr = currency === 'BYN' ? 'Br' : currency;
    
    if (salaryFrom && salaryTo) {
      return `${salaryFrom}-${salaryTo} ${curr}`;
    }
    if (salaryFrom) {
      return `от ${salaryFrom} ${curr}`;
    }
    if (salaryTo) {
      return `до ${salaryTo} ${curr}`;
    }
    return 'Не указано';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Вчера';
    if (diffDays === 0) return 'Сегодня';
    
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long'
    });
  };

  const truncateDescription = (text) => {
    if (!text) return '';
    // Удаляем HTML теги
    const plainText = text.replace(/<[^>]*>/g, '');
    return plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;
  };

  return (
    <div className={`vacancy-card ${isLoading ? 'loading' : ''}`} onClick={handleClick}>
      {isLoading ? (
        <div className="vacancy-content">
          <div className="vacancy-header">
            <div className="company-logo loading-placeholder"></div>
            <div className="vacancy-info">
              <div className="loading-placeholder company-placeholder"></div>
              <div className="loading-placeholder title-placeholder"></div>
            </div>
          </div>
          <div className="vacancy-details">
            <div className="loading-placeholder details-placeholder"></div>
            <div className="loading-placeholder details-placeholder"></div>
            <div className="loading-placeholder details-placeholder"></div>
          </div>
          <div className="loading-placeholder description-placeholder"></div>
        </div>
      ) : (
        <div className="vacancy-content">
          <div className="vacancy-header">
            <div className="company-logo">
              {employer?.logoUri ? (
                <img src={employer.logoUri} alt={employer.name} />
              ) : (
                <div className="company-logo-placeholder">
                  {employer?.name?.charAt(0) || 'N'}
                </div>
              )}
            </div>
            <div className="vacancy-info">
              <p className="company-name">{employer?.name}</p>
              <h3 className="vacancy-title">{name}</h3>
            </div>
          </div>

          <div className="vacancy-details">
            <div className="detail-item">
              <img src={LocationIcon} alt="Location" className="detail-icon" />
              <span>{area?.name}</span>
            </div>
            <div className="detail-item">
              <img src={SalaryIcon} alt="Salary" className="detail-icon" />
              <span>{formatSalary()}</span>
            </div>
            <div className="detail-item">
              <img src={CalendarIcon} alt="Date" className="detail-icon" />
              <span>{formatDate(publishedAt)}</span>
            </div>
          </div>

          {description && (
            <div className="vacancy-description">
              {truncateDescription(description)}
            </div>
          )}
        </div>
      )}
            {area?.country && (
            <div className="country-flag-wrapper">
              <img
                src={getFlag(area.country.name)}
                alt={`${area.country.name} Flag`}
                className="country-flag"
              />
            </div>
          )}
    </div>
  );
};

export default VacancyCardNormal;


