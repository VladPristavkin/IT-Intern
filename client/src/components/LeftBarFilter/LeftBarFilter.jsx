import React, { useState } from 'react';
import './LeftBarFilter.css';

const LeftBarFilter = () => {
  const [selectedSalary, setSelectedSalary] = useState('');
  const [selectedEmployment, setSelectedEmployment] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState([]);

  const handleReset = () => {
    setSelectedSalary('');
    setSelectedEmployment('');
    setSelectedCountry('');
    setSelectedRegion('');
    setSelectedExperience('');
    setSelectedSchedule('');
    setSelectedSpecialization([]);
  };

  const handleApplyFilters = () => {
    const filters = {
      salary: selectedSalary,
      employment: selectedEmployment,
      country: selectedCountry,
      region: selectedRegion,
      experience: selectedExperience,
      schedule: selectedSchedule,
      specialization: selectedSpecialization,
    };

    fetch('/api/apply-filters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Filters applied successfully:', data);
      })
      .catch(error => {
        console.error('Error applying filters:', error);
      });
  };

  return (
    <div className="left-bar-filter">
      <div className="filter-header">
        <h2>Фильтры</h2>
        <button className='reset-filter' onClick={handleReset}>Сбросить</button>
      </div>
      <div className="filter-section">
        <h3>Зарплата</h3>
        <label><input type="radio" value="" checked={selectedSalary === ''} onChange={() => setSelectedSalary('')} /> Не имеет значения</label>
        <label><input type="radio" value="500" checked={selectedSalary === '500'} onChange={() => setSelectedSalary('500')} /> от 500 BYN</label>
        <label><input type="radio" value="1000" checked={selectedSalary === '1000'} onChange={() => setSelectedSalary('1000')} /> от 1000 BYN</label>
        <label><input type="radio" value="1500" checked={selectedSalary === '1500'} onChange={() => setSelectedSalary('1500')} /> от 1500 BYN</label>
        <label><input type="radio" value="2500" checked={selectedSalary === '2500'} onChange={() => setSelectedSalary('2500')} /> от 2500 BYN</label>
      </div>

      <div className="filter-section">
        <h3>Тип занятости</h3>
        <label><input type="radio" value="full" checked={selectedEmployment === 'full'} onChange={() => setSelectedEmployment('full')} /> Полная</label>
        <label><input type="radio" value="part" checked={selectedEmployment === 'part'} onChange={() => setSelectedEmployment('part')} /> Частичная</label>
        <label><input type="radio" value="internship" checked={selectedEmployment === 'internship'} onChange={() => setSelectedEmployment('internship')} /> Стажировка</label>
        <label><input type="radio" value="project" checked={selectedEmployment === 'project'} onChange={() => setSelectedEmployment('project')} /> Проектная</label>
      </div>

      <div className="filter-section">
        <h3>Страна</h3>
        <label><input type="radio" value="" checked={selectedCountry === ''} onChange={() => setSelectedCountry('')} /> Не имеет значения</label>
        <label><input type="radio" value="russia" checked={selectedCountry === 'russia'} onChange={() => setSelectedCountry('russia')} /> Россия</label>
        <label><input type="radio" value="belarus" checked={selectedCountry === 'belarus'} onChange={() => setSelectedCountry('belarus')} /> Беларусь</label>
      </div>

      <div className="filter-section region">
        <h3>Регион</h3>
        <input type="text" placeholder="Поиск региона" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} />
        <p className='letter'>A</p>
        <label><input type="radio" value="altay" checked={selectedRegion === 'altay'} onChange={() => setSelectedRegion('altay')} /> Алтайский край</label>
        <label><input type="radio" value="amur" checked={selectedRegion === 'amur'} onChange={() => setSelectedRegion('amur')} /> Амурская область</label>
        <label><input type="radio" value="arkhangelsk" checked={selectedRegion === 'arkhangelsk'} onChange={() => setSelectedRegion('arkhangelsk')} /> Архангельская область</label>
        <label><input type="radio" value="astrakhan" checked={selectedRegion === 'astrakhan'} onChange={() => setSelectedRegion('astrakhan')} /> Астраханская область</label>
      </div>

      <div className="filter-section">
        <h3>Опыт работы</h3>
        <label><input type="radio" value="noExperience" checked={selectedExperience === 'noExperience'} onChange={() => setSelectedExperience('noExperience')} /> Нет опыта</label>
        <label><input type="radio" value="1-3years" checked={selectedExperience === '1-3years'} onChange={() => setSelectedExperience('1-3years')} /> от 1 года до 3 лет</label>
      </div>

      <div className="filter-section">
        <h3>График работы</h3>
        <label><input type="radio" value="fullDay" checked={selectedSchedule === 'fullDay'} onChange={() => setSelectedSchedule('fullDay')} /> Полный день</label>
        <label><input type="radio" value="shift" checked={selectedSchedule === 'shift'} onChange={() => setSelectedSchedule('shift')} /> Сменный график</label>
        <label><input type="radio" value="flexible" checked={selectedSchedule === 'flexible'} onChange={() => setSelectedSchedule('flexible')} /> Гибкий график</label>
        <label><input type="radio" value="remote" checked={selectedSchedule === 'remote'} onChange={() => setSelectedSchedule('remote')} /> Удалённая работа</label>
      </div>

      <div className="filter-section">
        <h3>Специализации</h3>
        <label><input type="checkbox" value="programmer" checked={selectedSpecialization.includes('programmer')} onChange={(e) => handleCheckboxChange(e, 'programmer')} /> Программист, разработчик</label>
        <label><input type="checkbox" value="designer" checked={selectedSpecialization.includes('designer')} onChange={(e) => handleCheckboxChange(e, 'designer')} /> Дизайнер, художник</label>
        <label><input type="checkbox" value="tester" checked={selectedSpecialization.includes('tester')} onChange={(e) => handleCheckboxChange(e, 'tester')} /> Тестировщик</label>
        <label><input type="checkbox" value="productManager" checked={selectedSpecialization.includes('productManager')} onChange={(e) => handleCheckboxChange(e, 'productManager')} /> Менеджер продукта</label>
      </div>

      <button className='use-filter' onClick={handleApplyFilters}>Применить</button>
    </div>
  );

  function handleCheckboxChange(event, specialization) {
    if (event.target.checked) {
      setSelectedSpecialization([...selectedSpecialization, specialization]);
    } else {
      setSelectedSpecialization(selectedSpecialization.filter(item => item !== specialization));
    }
  }
};

export default LeftBarFilter;

