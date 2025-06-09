import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InternshipsPage.css';

const InternshipsPage = () => {
  const navigate = useNavigate();

  // Моковые данные для стажировок
  const internships = [
    {
      id: 1,
      company: 'IT Solutions',
      position: 'Junior Frontend Developer',
      duration: '3 месяца',
      salary: '30 000 ₽',
      description: 'Стажировка в команде разработки веб-приложений. Изучение React, TypeScript и современных инструментов разработки.',
      requirements: ['JavaScript', 'HTML', 'CSS', 'React (базовый уровень)'],
      location: 'Москва (гибридный формат)'
    },
    {
      id: 2,
      company: 'Digital Agency',
      position: 'Backend Developer Intern',
      duration: '6 месяцев',
      salary: '45 000 ₽',
      description: 'Разработка и поддержка серверной части веб-приложений. Работа с Node.js и базами данных.',
      requirements: ['Python/Node.js', 'SQL', 'Git'],
      location: 'Удаленно'
    },
    {
      id: 3,
      company: 'Tech Innovations',
      position: 'QA Engineer Intern',
      duration: '4 месяца',
      salary: '35 000 ₽',
      description: 'Тестирование веб-приложений, написание автотестов, работа с баг-трекинговыми системами.',
      requirements: ['Основы тестирования', 'JavaScript', 'SQL (базовый уровень)'],
      location: 'Санкт-Петербург'
    }
  ];

  const handleApply = (internshipId) => {
    // Здесь будет логика подачи заявки на стажировку
    console.log(`Подана заявка на стажировку ${internshipId}`);
  };

  return (
    <div className="internships-page">
      <div className="internships-header">
        <h1>Доступные стажировки</h1>
        <p>Найдите подходящую стажировку и начните свою карьеру в IT</p>
      </div>

      <div className="internships-grid">
        {internships.map(internship => (
          <div key={internship.id} className="internship-card">
            <div className="internship-card-header">
              <h2>{internship.position}</h2>
              <span className="company-name">{internship.company}</span>
            </div>

            <div className="internship-details">
              <div className="detail-item">
                <span className="detail-label">Длительность:</span>
                <span className="detail-value">{internship.duration}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Стипендия:</span>
                <span className="detail-value">{internship.salary}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Локация:</span>
                <span className="detail-value">{internship.location}</span>
              </div>
            </div>

            <div className="internship-description">
              <p>{internship.description}</p>
            </div>

            <div className="internship-requirements">
              <h3>Требования:</h3>
              <ul>
                {internship.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <button 
              className="apply-button"
              onClick={() => handleApply(internship.id)}
            >
              Подать заявку
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipsPage; 