import React from 'react';
import './VacancyOverview.css';
import PublishedAtIcon from '../../assets/CalendarBlankBlue.svg';
import EmploymentIcon from '../../assets/badge.svg';
import ScheduleIcon from '../../assets/Timer.svg';
import ExperienceIcon from '../../assets/cases.svg';
import LanguagesIcon from '../../assets/language.svg';
import { getTranslatedValue } from '../../utils/translationMaps';

const VacancyOverview = ({ vacancy }) => {
  const { publishedAt, employment, schedule, experience, languages = [], keySkills = [] } = vacancy;

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString('ru', { month: 'long' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="vacancy-overview">
      <h2 className='overview-title'>Обзор вакансии</h2>
      
      <div className="overview-grid">
        <div className="overview-item">
          <img src={PublishedAtIcon} alt="Published At" className="overview-icon" />
          <div className="overview-text">
            <h3>ОПУБЛИКОВАНА:</h3>
            <p>{formatDate(publishedAt)}</p>
          </div>
        </div>

        <div className="overview-item">
          <img src={EmploymentIcon} alt="Employment" className="overview-icon" />
          <div className="overview-text">
            <h3>ЗАНЯТОСТЬ:</h3>
            <p>{getTranslatedValue('employments', employment)}</p>
          </div>
        </div>

        <div className="overview-item">
          <img src={ScheduleIcon} alt="Schedule" className="overview-icon" />
          <div className="overview-text">
            <h3>ГРАФИК:</h3>
            <p>{getTranslatedValue('schedules', schedule)}</p>
          </div>
        </div>

        <div className="overview-item">
          <img src={ExperienceIcon} alt="Experience" className="overview-icon" />
          <div className="overview-text">
            <h3>ОПЫТ РАБОТЫ:</h3>
            <p>{getTranslatedValue('experiences', experience)}</p>
          </div>
        </div>

        <div className="overview-item">
          <img src={LanguagesIcon} alt="Languages" className="overview-icon" />
          <div className="overview-text">
            <h3>ЯЗЫКИ:</h3>
            <div className="languages-list">
              {languages.length > 0 ? (
                languages.map((lang, index) => (
                  <p key={index}>{`${lang.name}: ${lang.level}`}</p>
                ))
              ) : (
                <p>Не указаны</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="overview-skills">
        <h3 className='keyskills-title'>Ключевые навыки:</h3>
        <div className="skills-list">
          {keySkills.length > 0 ? (
            keySkills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill.name}</span>
            ))
          ) : (
            <p className='no-skill'>Не указаны</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VacancyOverview;

