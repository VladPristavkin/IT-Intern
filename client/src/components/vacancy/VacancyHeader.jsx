import React, { useContext, useEffect, useState } from 'react';
import './VacancyHeader.css';
import RussianFlag from '../../assets/flags/ru.svg'; 
import BelarusFlag from '../../assets/flags/by.png';
import SaveIcon from '../../assets/Save.svg';
import DeleteIcon from '../../assets/delete_forever.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';

const VacancyHeader = ({ vacancy }) => {
  const { user } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const { 
    id,
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

  const handleSaveClick = () => {
    console.log('Save click triggered');
    console.log('User:', user);
    console.log('Can save:', canSave);
    console.log('Vacancy ID:', id);
    
    if (!user || !canSave) {
      console.log('Early return: no user or cannot save');
      return;
    }
  
    const userData = db.getUserById(user.userId);
    console.log('User data from DB:', userData);
    
    if (!userData) {
      console.log('No user data found');
      return;
    }
  
    const savedVacancies = userData.savedVacancies || [];
    console.log('Current saved vacancies:', savedVacancies);
    console.log('Is currently saved:', isSaved);
    
    let updatedVacancies;
  
    if (isSaved) {
      updatedVacancies = savedVacancies.filter(savedId => savedId !== id);
      console.log('Removing vacancy, new array:', updatedVacancies);
    } else {
      updatedVacancies = [...savedVacancies, id];
      console.log('Adding vacancy, new array:', updatedVacancies);
    }
  
    // Update user data
    const updateResult = db.update('users', 
       user.userId,
      {
        ...userData,
        savedVacancies: updatedVacancies
      });
    
    console.log('Update result:', updateResult);
    setIsSaved(!isSaved);
  };
  return (
    <div className="vh-container">
      <div className="vh-left-section"> 
        <div className="vh-employer-logo">
        {employer?.logoUri ? (
                  <img src={employer.logoUri} alt={employer.name} />
                ) : (
                  <div className="vh-employer-logo-placeholder">
                    {employer?.name?.charAt(0) || 'N'}
                  </div>
                )}
          </div>
        <div className="vh-content-wrapper">
          <div className="vh-company-info">
            {area?.country?.name && (
              <img src={getFlag(area.country.name)} alt={`${area.country.name} Flag`} className="vh-country-flag" />
            )}
            <h2 className='vh-employer-name'>{employer?.name || 'Не указано'}</h2>
          </div>
          <h1 className="vh-job-title">{name || 'Не указано'}</h1>
          <p className="vh-salary">{formatSalary()}</p>
        </div>
      </div>
      <div className="vh-buttons-container">
        {canSave && (
          <button onClick={handleSaveClick} className="vh-save-button">
            <img 
              src={isSaved ? DeleteIcon : SaveIcon} 
              alt={isSaved ? "Remove from saved" : "Save"} 
              className="vh-save-icon" 
            />
          </button>
        )}
        <button className="vh-apply-button" onClick={handleApplyClick}>
          Откликнуться <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
};

export default VacancyHeader;


