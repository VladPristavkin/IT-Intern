import React, { useState, useEffect } from 'react';
import './LeftBarFilter.css';
import { getAuxiliaryData } from '../../api/getAuxiliaryData';

const LeftBarFilter = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    salary: '',
    employment: [],
    country: '',
    area: [],
    experience: [],
    schedule: [],
    specialization: [],
  });

  const [auxiliaryData, setAuxiliaryData] = useState({
    countries: [],
    areas: [],
    employments: [],
    experiences: [],
    schedules: [],
    professionalRoles: [],
  });

  useEffect(() => {
    const fetchAuxiliaryData = async () => {
      try {
        const data = await getAuxiliaryData();
        setAuxiliaryData(data);
      } catch (error) {
        console.error('Error fetching auxiliary data:', error);
      }
    };

    fetchAuxiliaryData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      salary: '',
      employment: [],
      country: '',
      area: [],
      experience: [],
      schedule: [],
      specialization: [],
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div className="left-bar-filter">
      <div className="filter-header">
        <h2>Фильтры</h2>
        <button className="reset-filter" onClick={handleReset}>Сбросить</button>
      </div>

      <div className="filter-section">
        <h3>Зарплата</h3>
        <label>
          <input
            type="radio"
            name="salary"
            value=""
            checked={filters.salary === ''}
            onChange={(e) => handleFilterChange('salary', e.target.value)}
          />
          Не имеет значения
        </label>
        <label>
          <input
            type="radio"
            name="salary"
            value="500"
            checked={filters.salary === '500'}
            onChange={(e) => handleFilterChange('salary', e.target.value)}
          />
          от 500 BYN
        </label>
        <label>
          <input
            type="radio"
            name="salary"
            value="1000"
            checked={filters.salary === '1000'}
            onChange={(e) => handleFilterChange('salary', e.target.value)}
          />
          от 1000 BYN
        </label>
        <label>
          <input
            type="radio"
            name="salary"
            value="1500"
            checked={filters.salary === '1500'}
            onChange={(e) => handleFilterChange('salary', e.target.value)}
          />
          от 1500 BYN
        </label>
        <label>
          <input
            type="radio"
            name="salary"
            value="2500"
            checked={filters.salary === '2500'}
            onChange={(e) => handleFilterChange('salary', e.target.value)}
          />
          от 2500 BYN
        </label>
      </div>

      <div className="filter-section">
        <h3>Страна</h3>
        <select
          value={filters.country}
          onChange={(e) => handleFilterChange('country', e.target.value)}
        >
          <option value="">Не имеет значения</option>
          {auxiliaryData.countries.map(country => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h3>Регион</h3>
        <select
          multiple
          value={filters.area}
          onChange={(e) => handleFilterChange('area', Array.from(e.target.selectedOptions, option => option.value))}
        >
          {auxiliaryData.areas.map(area => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h3>Тип занятости</h3>
        {auxiliaryData.employments.map(employment => (
          <label key={employment}>
            <input
              type="checkbox"
              value={employment}
              checked={filters.employment.includes(employment)}
              onChange={(e) => {
                const newEmployment = e.target.checked
                  ? [...filters.employment, employment]
                  : filters.employment.filter(item => item !== employment);
                handleFilterChange('employment', newEmployment);
              }}
            />
            {employment}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>График работы</h3>
        {auxiliaryData.schedules.map(schedule => (
          <label key={schedule}>
            <input
              type="checkbox"
              value={schedule}
              checked={filters.schedule.includes(schedule)}
              onChange={(e) => {
                const newSchedule = e.target.checked
                  ? [...filters.schedule, schedule]
                  : filters.schedule.filter(item => item !== schedule);
                handleFilterChange('schedule', newSchedule);
              }}
            />
            {schedule}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Опыт работы</h3>
        {auxiliaryData.experiences.map(experience => (
          <label key={experience}>
            <input
              type="checkbox"
              value={experience}
              checked={filters.experience.includes(experience)}
              onChange={(e) => {
                const newExperience = e.target.checked
                  ? [...filters.experience, experience]
                  : filters.experience.filter(item => item !== experience);
                handleFilterChange('experience', newExperience);
              }}
            />
            {experience}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Специализация</h3>
        <select
          multiple
          value={filters.specialization}
          onChange={(e) => handleFilterChange('specialization', Array.from(e.target.selectedOptions, option => option.value))}
        >
          {auxiliaryData.professionalRoles.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LeftBarFilter;

