import React, { useState, useEffect } from 'react';
import { getVacanciesNormal } from '../../api/getVacanciesNormal';
import VacancyControls from './VacancyControls';
import VacancyCardNormal from './VacancyCardNormal';
import Pagination from '../common/Pagination';
import './VacancyListNormal.css';

const VacancyListNormal = () => {
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
  const [filters, setFilters] = useState({
    country: '',
    area: [],
    employment: [],
    schedule: [],
    experience: [],
    specialization: [],
    salary: ''
  });

  useEffect(() => {
    const fetchVacancies = async () => {
      setError(null);

      try {
        const queryParams = {
          page: currentPage,
          pageSize: itemsPerPage,
          searchText: searchTerm || undefined,
          searchPeriod: dateFilter || undefined,
          orderBy: salarySort || undefined,
          country: filters.country ? [filters.country] : undefined,
          area: filters.area.length > 0 ? filters.area : undefined,
          employment: filters.employment.length > 0 ? filters.employment : undefined,
          schedule: filters.schedule.length > 0 ? filters.schedule : undefined,
          experience: filters.experience.length > 0 ? filters.experience : undefined,
          professionalRole: filters.specialization.length > 0 ? filters.specialization : undefined,
          salaryFrom: filters.salary ? Number(filters.salary) : undefined
        };

        const response = await getVacanciesNormal(queryParams);
        console.log('API Response:', {
          totalCount: response.totalCount,
          itemsCount: response.items?.length,
          firstItem: response.items?.[0],
          allItems: response.items,
          rawResponse: response
        });

        if (!response.items) {
          console.error('No items array in response:', response);
          setError('Неверный формат данных с сервера');
          return;
        }

        setVacancies(response.items);
        setTotalVacancies(response.totalCount || 0);
      } catch (err) {
        setError('Произошла ошибка при загрузке вакансий. Пожалуйста, попробуйте позже.');
        console.error('Error fetching vacancies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, [currentPage, itemsPerPage, searchTerm, dateFilter, salarySort, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="vacancy-list-normal">
      <VacancyControls
        totalVacancies={totalVacancies}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        salarySort={salarySort}
        setSalarySort={setSalarySort}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          Загрузка...
        </div>
      ) : (
        <>
          <div className="vacancies-grid">
            {vacancies && vacancies.length > 0 ? (
              vacancies.map((vacancy) => (
                <VacancyCardNormal vacancy={vacancy} />
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
        </>
      )}
    </div>
  );
};

export default VacancyListNormal;




