import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './SavedVacancyCard.css';
import RussianFlag from '../../assets/Rectangle445.svg';
import BelarusFlag from '../../assets/Rectangle443.svg';
import LocationIcon from '../../assets/Location-icon.svg';
import SalaryIcon from '../../assets/Money-icon.svg';
import CalendarIcon from '../../assets/CalendarBlank.svg';
import DeleteIcon from '../../assets/delete_forever.svg';
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';

const SavedVacancyCard = ({ vacancy, onRemove, isLoading }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
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
    if (!isLoading) {
      navigate(`/vacancies/${id}`);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    const userData = db.getUserById(user.userId);
    if (!userData) return;

    const updatedVacancies = userData.savedVacancies.filter(savedId => savedId !== id);
    db.update('users', {
      ...userData,
      savedVacancies: updatedVacancies
    });

    if (onRemove) {
      onRemove(id);
    }
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
    const plainText = text.replace(/<[^>]*>/g, '');
    return plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;
  };

  return (
    <div className={`svc-card ${isLoading ? 'svc-loading' : ''}`} onClick={handleClick}>
      {isLoading ? (
        <div className="svc-content">            
          <div className="svc-company-logo vcn-loading-placeholder"></div>
          <div>
            <div className="svc-header">
              <div className="svc-info">
                <div className="svc-loading-placeholder vcn-company-placeholder"></div>
                <div className="svc-loading-placeholder vcn-title-placeholder"></div>
              </div>
            </div>
            <div className="svc-details">
              <div className="svc-loading-placeholder vcn-details-placeholder"></div>
              <div className="svc-loading-placeholder vcn-details-placeholder"></div>
              <div className="svc-loading-placeholder vcn-details-placeholder"></div>
            </div>
            <div className="svc-loading-placeholder vcn-description-placeholder"></div>
          </div>
        </div>
      ) : (
        <div className="svc-content">
            <div className="svc-company-logo">
              {employer?.logoUri ? (
                <img src={employer.logoUri} alt={employer.name} />
              ) : (
                <div className="svc-company-logo-placeholder">
                  {employer?.name?.charAt(0) || 'N'}
                </div>
              )}
            </div>
            <div className='svc-other-description'>
              <div className="svc-info">
                <p className="svc-company-name">{employer?.name}</p>
                <h3 className="svc-title">{name}</h3>
              </div>
              <div className="svc-details">
                <div className="svc-detail-item">
                  <img src={LocationIcon} alt="Location" className="svc-detail-icon" />
                  <span>{area?.name}</span>
                </div>
                <div className="svc-detail-item">
                  <img src={SalaryIcon} alt="Salary" className="svc-detail-icon" />
                  <span>{formatSalary()}</span>
                </div>
                <div className="svc-detail-item">
                  <img src={CalendarIcon} alt="Date" className="svc-detail-icon" />
                  <span>{formatDate(publishedAt)}</span>
                </div>
              </div>
              {description && (
                <div className="svc-description">
                  {truncateDescription(description)}
                </div>
              )}
              </div>
          {!isLoading && (
            <button className="svc-remove-button" onClick={handleRemove} title="Удалить из сохраненных">
              <img src={DeleteIcon} alt="Удалить из сохраненных" className="svc-remove-icon" />
            </button>
          )}
        </div>
      )}
      {area?.country && (
  <div className="svc-country-flag-wrapper">
    <img
      src={getFlag(area.country.name)}
      alt={`${area.country.name} Flag`}
      className="svc-country-flag"
    />
  </div>
)}
    </div>
  );
};

export default SavedVacancyCard; 