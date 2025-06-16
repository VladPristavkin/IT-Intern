import React from 'react';
import { Link } from 'react-router-dom';
import './VacancyCard.css';

const VacancyCard = ({ vacancy }) => {
  const formatSalary = () => {
    if (!vacancy.salaryFrom && !vacancy.salaryTo) return 'Зарплата не указана';
    if (vacancy.salaryFrom && vacancy.salaryTo) {
      return `${vacancy.salaryFrom.toLocaleString()} - ${vacancy.salaryTo.toLocaleString()} ${vacancy.currency || ''}`;
    }
    if (vacancy.salaryFrom) return `от ${vacancy.salaryFrom.toLocaleString()} ${vacancy.currency || ''}`;
    if (vacancy.salaryTo) return `до ${vacancy.salaryTo.toLocaleString()} ${vacancy.currency || ''}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="vacancy-card">
      <Link to={`/vacancies/${vacancy.id}`} className="vacancy-card-link">
        <div className="vacancy-card-header">
          <h3 className="vacancy-title">{vacancy.name}</h3>
          <div className="salary">{formatSalary()}</div>
        </div>

        <div className="company-info">
          {vacancy.employer && (
            <>
              {vacancy.employer.logoUri && (
                <img 
                  src={vacancy.employer.logoUri} 
                  alt={vacancy.employer.name} 
                  className="company-logo"
                />
              )}
              <span className="company-name">{vacancy.employer.name}</span>
            </>
          )}
        </div>

        <div className="vacancy-details">
          {vacancy.area && (
            <div className="location">
              <i className="location-icon">📍</i>
              {vacancy.area.name}
            </div>
          )}
          
          <div className="employment-info">
            {vacancy.employment && <span className="tag">{vacancy.employment}</span>}
            {vacancy.schedule && <span className="tag">{vacancy.schedule}</span>}
            {vacancy.experience && <span className="tag">{vacancy.experience}</span>}
          </div>

          {vacancy.keySkills && vacancy.keySkills.length > 0 && (
            <div className="skills">
              {vacancy.keySkills.slice(0, 3).map((skill, index) => (
                <span key={index} className="skill-tag">{skill.name}</span>
              ))}
              {vacancy.keySkills.length > 3 && (
                <span className="skill-tag more">+{vacancy.keySkills.length - 3}</span>
              )}
            </div>
          )}
        </div>

        <div className="vacancy-footer">
          <span className="publication-date">
            Опубликовано: {formatDate(vacancy.publishedAt)}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default VacancyCard; 