import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './LeftBarFilter.css';
import { getAuxiliaryData } from '../../api/getAuxiliaryData';

const LeftBarFilter = ({ onFiltersChange, initialCountry }) => {
  // Словари для перевода числовых значений в читаемые названия
  const translationMaps = {
    experiences: {
      '0': 'Нет опыта',
      '1': 'от 1 года до 3 лет', 
      '2': 'от 3 до 6 лет',
      '3': 'более 6 лет'
      // Добавьте здесь свои соответствия
    },
    employments: {
      '0': 'Полная',
      '1': 'Частичная',
      '2': 'Стажировка',
      '3': 'Проектная'
      // Добавьте здесь свои соответствия
    },
    schedules: {
      '0': 'Полный день',
      '1': 'Сменный график',
      '2': 'Гибкий график',
      '3': 'Удалённая работа'
      // Добавьте здесь свои соответствия
    }
  };

  const [filters, setFilters] = useState({
    salary: '',
    employment: [],
    country: initialCountry || '',
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

  const [regionSearch, setRegionSearch] = useState('');
  const [debouncedRegionSearch, setDebouncedRegionSearch] = useState('');
  const [showMoreSpecializations, setShowMoreSpecializations] = useState(false);
  const [visibleRegionsCount, setVisibleRegionsCount] = useState({}); // Количество видимых регионов для каждой буквы
  const [isRegionExpanded, setIsRegionExpanded] = useState(false); // Состояние развернутости регионов

  const INITIAL_REGIONS_PER_LETTER = 5;
  const LOAD_MORE_REGIONS_PER_LETTER = 10;
  const COLLAPSED_HEIGHT = 200; // Высота в свернутом состоянии
  const EXPANDED_HEIGHT = 400; // Высота в развернутом состоянии

  // Дебаунсинг для поиска регионов
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedRegionSearch(regionSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [regionSearch]);

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

  useEffect(() => {
    if (initialCountry !== undefined) {
      handleFilterChange('country', initialCountry);
    }
  }, [initialCountry]);

  // Функция для получения переведенного названия
  const getTranslatedValue = (type, value) => {
    return translationMaps[type]?.[value] || value;
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = useCallback(() => {
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
    setRegionSearch('');
    setDebouncedRegionSearch('');
    setVisibleRegionsCount({});
    setIsRegionExpanded(false);
    onFiltersChange(resetFilters);
  }, [onFiltersChange]);

  // Функция для загрузки дополнительных регионов для конкретной буквы
  const loadMoreRegionsForLetter = (letter) => {
    setVisibleRegionsCount(prev => ({
      ...prev,
      [letter]: (prev[letter] || INITIAL_REGIONS_PER_LETTER) + LOAD_MORE_REGIONS_PER_LETTER
    }));
  };

  // Функция для переключения состояния развернутости регионов
  const toggleRegionExpansion = () => {
    setIsRegionExpanded(!isRegionExpanded);
  };

  const groupedAreas = useMemo(() => {
    const grouped = auxiliaryData.areas.reduce((acc, area) => {
      let firstChar = area.name.charAt(0).toUpperCase();
      
      // Быстрая замена Ё на Е
      if (firstChar === 'Ё') firstChar = 'Е';
      
      // Только буквы
      if (/^[А-ЯA-Z]$/.test(firstChar)) {
        (acc[firstChar] ||= []).push(area);
      }
      
      return acc;
    }, {});
  
    return grouped;
  }, [auxiliaryData.areas]);

  // Мемоизированная фильтрация регионов по поиску (ограниченная)
  const filteredAreas = useMemo(() => {
    if (!debouncedRegionSearch) return [];
    
    const searchLower = debouncedRegionSearch.toLowerCase();
    return auxiliaryData.areas
      .filter(area => area.name.toLowerCase().includes(searchLower))
      .slice(0, 50); // Ограничиваем результаты поиска
  }, [auxiliaryData.areas, debouncedRegionSearch]);

  // Мемоизированные видимые специализации
  const visibleSpecializations = useMemo(() => {
    return showMoreSpecializations 
      ? auxiliaryData.professionalRoles 
      : auxiliaryData.professionalRoles.slice(0, 4);
  }, [auxiliaryData.professionalRoles, showMoreSpecializations]);

  return (
    <div className="left-bar-filter">
      <div className="filter-header">
        <h2>Фильтры</h2>
        <button className="reset-filter" onClick={handleReset}>Сбросить</button>
      </div>

      {/* Страна */}
      <div className="filter-section">
        <h3>Страна</h3>
        <label>
          <input
            type="checkbox"
            checked={filters.country === ''}
            onChange={(e) => handleFilterChange('country', e.target.checked ? '' : filters.country)}
          />
          Не имеет значения
        </label>
        {auxiliaryData.countries.map(country => (
          <label key={country.id}>
            <input
              type="checkbox"
              checked={filters.country === country.id}
              onChange={(e) => handleFilterChange('country', e.target.checked ? country.id : '')}
            />
            {country.name}
          </label>
        ))}
      </div>

      {/* Регион */}
      <div className="filter-section region">
        <h3>Регион</h3>
        <input
          type="text"
          placeholder="Поиск региона"
          className="region-search"
          value={regionSearch}
          onChange={(e) => setRegionSearch(e.target.value)}
        />
        
        <div 
          className={`region-list ${isRegionExpanded ? 'expanded' : 'collapsed'}`}
          style={{ 
            maxHeight: isRegionExpanded ? `${EXPANDED_HEIGHT}px` : `${COLLAPSED_HEIGHT}px`,
            transition: 'max-height 0.3s ease-in-out'
          }}
        >
          {debouncedRegionSearch ? (
            // Показываем отфильтрованные результаты поиска
            <>
              {filteredAreas.length > 0 ? (
                filteredAreas.map(area => (
                  <label key={area.id}>
                    <input
                      type="checkbox"
                      value={area.id}
                      checked={filters.area.includes(area.id)}
                      onChange={(e) => {
                        const newArea = e.target.checked
                          ? [...filters.area, area.id]
                          : filters.area.filter(item => item !== area.id);
                        handleFilterChange('area', newArea);
                      }}
                    />
                    {area.name}
                  </label>
                ))
              ) : (
                <div className="no-results">Ничего не найдено</div>
              )}
              {filteredAreas.length === 50 && (
                <div className="search-limit-notice">
                  Показано первые 50 результатов. Уточните поиск для более точных результатов.
                </div>
              )}
            </>
          ) : (
            // Показываем сгруппированные по алфавиту
            <>
              {Object.keys(groupedAreas).sort().map(letter => {
                const regionsForLetter = groupedAreas[letter];
                const visibleCount = visibleRegionsCount[letter] || INITIAL_REGIONS_PER_LETTER;
                const visibleRegions = regionsForLetter.slice(0, visibleCount);
                const hasMoreRegions = regionsForLetter.length > visibleCount;
                const remainingCount = regionsForLetter.length - visibleCount;

                return (
                  <div key={letter}>
                    <div className="letter">{letter}</div>
                    {visibleRegions.map(area => (
                      <label key={area.id}>
                        <input
                          type="checkbox"
                          value={area.id}
                          checked={filters.area.includes(area.id)}
                          onChange={(e) => {
                            const newArea = e.target.checked
                              ? [...filters.area, area.id]
                              : filters.area.filter(item => item !== area.id);
                            handleFilterChange('area', newArea);
                          }}
                        />
                        {area.name}
                      </label>
                    ))}
                    {hasMoreRegions && (
                      <button 
                        className="show-more-in-group"
                        onClick={() => loadMoreRegionsForLetter(letter)}
                      >
                        ... и ещё {remainingCount > LOAD_MORE_REGIONS_PER_LETTER ? `${LOAD_MORE_REGIONS_PER_LETTER}+` : remainingCount}
                      </button>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
        
        <button className="collapse-button" onClick={toggleRegionExpansion}>
          {isRegionExpanded ? 'Свернуть' : 'Развернуть'}
        </button>
      </div>

      {/* Специализации */}
      <div className="filter-section">
        <h3>Специализации</h3>
        {visibleSpecializations.map(role => (
          <label key={role.id}>
            <input
              type="checkbox"
              value={role.id}
              checked={filters.specialization.includes(role.id)}
              onChange={(e) => {
                const newSpecialization = e.target.checked
                  ? [...filters.specialization, role.id]
                  : filters.specialization.filter(item => item !== role.id);
                handleFilterChange('specialization', newSpecialization);
              }}
            />
            {role.name}
          </label>
        ))}
        
        {auxiliaryData.professionalRoles.length > 4 && (
          <button 
            className="show-more-button"
            onClick={() => setShowMoreSpecializations(!showMoreSpecializations)}
          >
            {showMoreSpecializations ? 'Скрыть' : 'Выбрать ещё'}
          </button>
        )}
      </div>

      {/* Зарплата */}
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

      {/* Опыт работы */}
      <div className="filter-section">
        <h3>Опыт работы</h3>
        {auxiliaryData.experiences.map(experience => (
          <label key={experience}>
            <input
              type="radio"
              name="experience"
              value={experience}
              checked={filters.experience.includes(experience)}
              onChange={(e) => {
                handleFilterChange('experience', e.target.checked ? [experience] : []);
              }}
            />
            {getTranslatedValue('experiences', experience)}
          </label>
        ))}
      </div>

      {/* Тип занятости */}
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
            {getTranslatedValue('employments', employment)}
          </label>
        ))}
      </div>

      {/* График работы */}
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
            {getTranslatedValue('schedules', schedule)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default LeftBarFilter;