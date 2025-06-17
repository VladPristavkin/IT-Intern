import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VacancyCardNormal.css';
import RussianFlag from '../../assets/Rectangle445.svg';
import BelarusFlag from '../../assets/Rectangle443.svg';
import LocationIcon from '../../assets/Location-icon.svg';
import SalaryIcon from '../../assets/Money-icon.svg';
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
    <div className={`vcn-card ${isLoading ? 'vcn-loading' : ''}`} onClick={handleClick}>
      {isLoading ? (
        <div className="vcn-content">            
          <div className="vcn-company-logo vcn-loading-placeholder"></div>
          <div>
            <div className="vcn-header">
              <div className="vcn-info">
                <div className="vcn-loading-placeholder vcn-company-placeholder"></div>
                <div className="vcn-loading-placeholder vcn-title-placeholder"></div>
              </div>
            </div>
            <div className="vcn-details">
              <div className="vcn-loading-placeholder vcn-details-placeholder"></div>
              <div className="vcn-loading-placeholder vcn-details-placeholder"></div>
              <div className="vcn-loading-placeholder vcn-details-placeholder"></div>
            </div>
            <div className="vcn-loading-placeholder vcn-description-placeholder"></div>
          </div>
        </div>
      ) : (
        <div className='vcn-content'>
          <div className="vcn-company-logo">
            {employer?.logoUri ? (
              <img src={employer.logoUri} alt={employer.name} />
            ) : (
              <div className="vcn-company-logo-placeholder">
                {employer?.name?.charAt(0) || 'N'}
              </div>
            )}
          </div>
          <div className='vcn-other-description'>
            <div className="vcn-info">
              <p className="vcn-company-name">{employer?.name}</p>
              <h3 className="vcn-title">{name}</h3>
            </div>
            <div className="vcn-details">
              <div className="vcn-detail-item">
                <img src={LocationIcon} alt="Location" className="vcn-detail-icon" />
                <span>{area?.name}</span>
              </div>
              <div className="vcn-detail-item">
                <img src={SalaryIcon} alt="Salary" className="vcn-detail-icon" />
                <span>{formatSalary()}</span>
              </div>
              <div className="vcn-detail-item">
                <img src={CalendarIcon} alt="Date" className="vcn-detail-icon" />
                <span>{formatDate(publishedAt)}</span>
              </div>
            </div>
            {description && (
              <div className="vcn-description">
                {truncateDescription(description)}
              </div>
            )}
          </div>
        </div>
      )}
      {area?.country && (
        <div className="vcn-country-flag-wrapper">
          <img
            src={getFlag(area.country.name)}
            alt={`${area.country.name} Flag`}
            className="vcn-country-flag"
          />
        </div>
      )}
    </div>
  );
};

export default VacancyCardNormal;