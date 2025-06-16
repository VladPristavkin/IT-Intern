import React, { useState, useEffect, useCallback } from 'react';
import { getVacanciesNormal } from '../../api/getVacanciesNormal';
import VacancyControls from './VacancyControls';
import VacancyCardNormal from './VacancyCardNormal';
import Pagination from '../common/Pagination';
import './VacancyListNormal.css';

const VacancyListNormal = ({ filters: externalFilters }) => {
  const [vacancies, setVacancies] = useState([]);
  const [totalVacancies, setTotalVacancies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [salarySort, setSalarySort] = useState(null);

  // Функция для выполнения запроса
  const fetchVacancies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = {
        page: currentPage,
        pageSize: itemsPerPage,
        searchText: searchTerm || undefined,
        searchPeriod: dateFilter || undefined,
        orderBy: salarySort || undefined,
        country: externalFilters.country ? [externalFilters.country] : undefined,
        area: externalFilters.area.length > 0 ? externalFilters.area : undefined,
        employment: externalFilters.employment.length > 0 ? externalFilters.employment : undefined,
        schedule: externalFilters.schedule.length > 0 ? externalFilters.schedule : undefined,
        experience: externalFilters.experience.length > 0 ? externalFilters.experience : undefined,
        professionalRole: externalFilters.specialization.length > 0 ? externalFilters.specialization : undefined,
        salaryFrom: externalFilters.salary ? Number(externalFilters.salary) : undefined
      };

      console.log('Sending request with params:', queryParams);
      const response = await getVacanciesNormal(queryParams);
      console.log('Received response:', response);

      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response format from server');
      }

      const { items, totalCount } = response;

      if (!Array.isArray(items)) {
        throw new Error('Items is not an array');
      }

      setVacancies(items);
      setTotalVacancies(totalCount || 0);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.response?.data?.message || err.message || 'Произошла ошибка при загрузке вакансий');
      setVacancies([]);
      setTotalVacancies(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, dateFilter, salarySort, externalFilters]);

  // Эффект для отслеживания изменений фильтров
  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  // Обработчики изменения фильтров с немедленным применением
  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
    setCurrentPage(1);
  };

  const handleSalarySortChange = (value) => {
    setSalarySort(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="vacancy-list-normal">
      <VacancyControls
        totalVacancies={totalVacancies}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={handleItemsPerPageChange}
        dateFilter={dateFilter}
        setDateFilter={handleDateFilterChange}
        salarySort={salarySort}
        setSalarySort={handleSalarySortChange}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchTermChange}
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="vacancies-grid">
        {loading ? (
          // Показываем плейсхолдеры во время загрузки
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <VacancyCardNormal key={`loading-${index}`} vacancy={{}} isLoading={true} />
          ))
        ) : vacancies && vacancies.length > 0 ? (
          vacancies.map((vacancy) => (
            <VacancyCardNormal key={vacancy.id} vacancy={vacancy} isLoading={false} />
          ))
        ) : (
          <div className="no-vacancies">
            Вакансии не найдены. Попробуйте изменить параметры поиска.
          </div>
        )}
      </div>

      {totalVacancies > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalVacancies / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default VacancyListNormal;




