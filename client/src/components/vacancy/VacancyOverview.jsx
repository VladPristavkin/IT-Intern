import React from 'react';
import './VacancyOverview.css';
import PublishedAtIcon from '../../assets/CalendarBlankBlue.svg';
import EmploymentIcon from '../../assets/badge.svg';
import ScheduleIcon from '../../assets/Timer.svg';
import ExperienceIcon from '../../assets/cases.svg';
import LanguagesIcon from '../../assets/language.svg';

const VacancyOverview = ({ vacancy }) => {
  const { publishedAt, employment, schedule, experience, languages = [], keySkills = [] } = vacancy;

  return (
    <div className="vacancy-overview">
    <h2 className='overview-title'>Обзор вакансии</h2>
      <div className="upper-column">
        <div className="overview-item">
            <img src={PublishedAtIcon} alt="Published At" className="overview-icon" />
            <div className="overview-text">
            <h3>Опубликована:</h3>
            <p>{new Date(publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
        </div>
        <div className="overview-item">
            <img src={EmploymentIcon} alt="Employment" className="overview-icon" />
            <div className="overview-text">
            <h3>Занятость:</h3>
            <p>{employment.name}</p>
            </div>
        </div>
        <div className="overview-item">
            <img src={ScheduleIcon} alt="Schedule" className="overview-icon" />
            <div className="overview-text">
            <h3>График:</h3>
            <p>{schedule.name}</p>
            </div>
        </div>
        <div className="overview-item">
            <img src={ExperienceIcon} alt="Experience" className="overview-icon" />
            <div className="overview-text">
            <h3>Опыт работы:</h3>
            <p>{experience.name}</p>
            </div>
        </div>
        <div className="overview-item overview-languages">
            <img src={LanguagesIcon} alt="Languages" className="overview-icon" />
            <div className="overview-text">
            <h3>Языки:</h3>
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
      <div className="separator"></div>
      <div className="overview-skills">
        <h3 className='keyskills-title'>Ключевые навыки:</h3>
        <div className="skills-list">
        {keySkills.length > 0 ? (
          keySkills.map((skill, index) => (
            <span key={index} className="skill">{skill.name}</span>
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

