import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MapPin from '../../assets/MapPin.svg';
import SaveIcon from '../../assets/Save.svg';
import DeleteIcon from '../../assets/delete_forever.svg';
import RussianFlag from '../../assets/flags/ru.svg';
import BelarusFlag from '../../assets/flags/by.png';
import MoneyIcon from '../../assets/Money-icon.svg';
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';
import './SimilarVacancyCard.css';

const SimilarVacancyCard = ({ vacancy }) => {
  const { user } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const {
    id,
    name,
    employer,
    area,
    salaryFrom,
    salaryTo,
    currency
  } = vacancy;

  useEffect(() => {
    if (user) {
      const userData = db.getUserById(user.userId);
      // Check if user is a student
      setCanSave(userData?.role === 'student');
      if (userData?.savedVacancies?.includes(id)) {
        setIsSaved(true);
      }
    } else {
      setCanSave(false);
    }
  }, [user, id]);

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

  const handleBookmarkClick = (e) => {
    e.preventDefault(); // Prevent navigation
    if (!user || !canSave) return; // Do nothing if user is not logged in or not a student

    const userData = db.getUserById(user.userId);
    if (!userData) return;

    const savedVacancies = userData.savedVacancies || [];
    let updatedVacancies;

    if (isSaved) {
      // Remove vacancy from saved
      updatedVacancies = savedVacancies.filter(savedId => savedId !== id);
    } else {
      // Add vacancy to saved
      updatedVacancies = [...savedVacancies, id];
    }

    // Update user data
    db.update('users', user.userId, {
      ...userData,
      savedVacancies: updatedVacancies
    });

    setIsSaved(!isSaved);
  };

  return (
    <Link to={`/vacancies/${id}`} className="similar-vacancy-card-link">
      <div className="similar-vacancy-card">
        <div className="similar-vacancy-title">
          {name}
        </div>
        
        <div className="similar-vacancy-salary-row">
          {getFlag(area?.country?.name) && (
            <img 
              src={getFlag(area.country.name)} 
              alt="Country flag" 
              className="similar-country-flag"
            />
          )}
          <img src={MoneyIcon} alt="Salary" className="similar-money-icon" />
          <span className="similar-salary-amount">{formatSalary()}</span>
        </div>

        <div className="similar-vacancy-company-row">
          <div className="similar-company-logo-wrapper">
            {employer?.logoUri ? (
              <img src={employer.logoUri} alt={employer.name} className="similar-company-logo" />
            ) : (
              <div className="similar-company-logo-placeholder"></div>
            )}
          </div>
          <div className="similar-company-info">
            <div className="similar-company-name">{employer?.name || 'Не указано'}</div>
            <div className="similar-location-container">
              <img src={MapPin} alt="Location" className="similar-location-icon" />
              <span className="similar-location-text">{area?.name || 'Не указано'}</span>
            </div>
          </div>
          {canSave && (
            <button 
              className="similar-vacancy-bookmark"
              onClick={handleBookmarkClick}>
              <img 
                src={isSaved ? DeleteIcon : SaveIcon} 
                alt={isSaved ? "Remove from saved" : "Save"} 
                className="similar-bookmark-icon" 
              />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SimilarVacancyCard;