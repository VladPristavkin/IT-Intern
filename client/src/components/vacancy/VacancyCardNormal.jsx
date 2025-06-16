import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VacancyCardNormal.css';
import JobLocation from '../../assets/MapPin.svg';
import JobSalary from '../../assets/Money.svg';
import JobPublishedAt from '../../assets/CalendarBlank.svg';
import BelorussianFlag from '../../assets/flags/by.svg';
import RussianFlag from '../../assets/flags/ru.svg';

const VacancyCardNormal = ({ vacancy }) => {
  const navigate = useNavigate();

  if (!vacancy) {
    return null;
  }

  const {
    id,
    name,
    employer,
    area,
    country,
    description,
    publishedAt
  } = vacancy;

  console.log(vacancy);
  console.log(id);
  const handleClick = () => {
    navigate(`/vacancy/${id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Не указано";
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        return 'Вчера';
      } else if (diffDays === 0) {
        return 'Сегодня';
      } else {
        return date.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long'
        });
      }
    } catch (error) {
      return "Не указано";
    }
  };

  const getFlag = (countryName) => {
    if (!countryName) return null;
    
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
    if (!salary) return "Не указано";
    
    const { from, to, currency } = salary;
    const currencySymbol = currency === 'BYN' ? 'Br' : currency;
    
    if (from != null && from !== 0) {
      if (to != null && to !== 0) {
        return `${from.toLocaleString()}-${to.toLocaleString()} ${currencySymbol}`;
      }
      return `от ${from.toLocaleString()} ${currencySymbol}`;
    }
    if (to != null && to !== 0) {
      return `до ${to.toLocaleString()} ${currencySymbol}`;
    }
    return "Не указано";
  };

  const renderDescription = (desc) => {
    if (!desc) return "Описание не указано";

    // Check if the description is HTML
    if (desc.includes('<') && desc.includes('>')) {
      return <div dangerouslySetInnerHTML={{ __html: desc }} />;
    }

    // If it's plain text, preserve line breaks
    return desc.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < desc.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="vacancy-card" onClick={handleClick}>
      <div className="vacancy-content">
        <div className="vacancy-header">
          <div className="vacancy-header-left">
            {employer?.logoUri ? (
              <img src={employer.logoUri} alt={employer.name} className="employer-logo"/>
            ) : (
              <div className="employer-logo-placeholder" />
            )}
            <div className="vacancy-title-container">
              <h2 className="vacancy-title">{name || "Не указано"}</h2>
              <p className="vacancy-company">{employer?.name || "Не указано"}</p>
            </div>
          </div>
          {country?.name && (
            <img
              src={getFlag(country.name)}
              alt={`${country.name} Flag`}
              className="country-flag"
            />
          )}
        </div>

        <div className="vacancy-info">
          <div className="vacancy-item">
            <img src={JobLocation} alt="Location" className="icon" />
            <span className="vacancy-location">{area?.name || "Не указано"}</span>
          </div>
          <div className="vacancy-item">
            <img src={JobSalary} alt="Salary" className="icon" />
            <span className="vacancy-salary">{formatSalary({from:vacancy.salaryFrom, to:vacancy.salaryTo, currency:vacancy.currency})}</span>
          </div>
          <div className="vacancy-item">
            <img src={JobPublishedAt} alt="Published" className="icon" />
            <span className="vacancy-published">{formatDate(publishedAt)}</span>
          </div>
        </div>

        <div className="vacancy-description">
          {renderDescription(description)}
        </div>
      </div>
    </div>
  );
};

export default VacancyCardNormal;


