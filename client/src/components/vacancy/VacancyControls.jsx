import React from 'react';
import './VacancyControls.css';

const SearchPeriod = {
  byDateOfPosting: 'За сегодня',
  inThreeDays: 'За 3 дня',
  perWeek: 'За неделю',
  perMonth: 'За месяц'
};

const OrderBy = {
  salaryAsc: 'По возрастанию З/П',
  salaryDesc: 'По убыванию З/П'
};

const VacancyControls = ({
  totalVacancies,
  itemsPerPage,
  setItemsPerPage,
  dateFilter,
  setDateFilter,
  salarySort,
  setSalarySort,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className="vacancy-controls-wrapper">
      <div className="vacancy-controls-header">
        <h1 className="total-vacancies">{totalVacancies} вакансий</h1>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Поиск по вакансиям"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <label htmlFor="items-per-page">Показывать по:</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="date-filter">Период:</label>
          <select
            id="date-filter"
            value={dateFilter || ''}
            onChange={(e) => setDateFilter(e.target.value || null)}
          >
            <option value="">За всё время</option>
            {Object.entries(SearchPeriod).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="salary-sort">Сортировка:</label>
          <select
            id="salary-sort"
            value={salarySort || ''}
            onChange={(e) => setSalarySort(e.target.value || null)}
          >
            <option value="">По умолчанию</option>
            {Object.entries(OrderBy).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VacancyControls;



