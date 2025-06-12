import React, { useEffect, useState } from 'react';
import VacancyCardNormal from './VacancyCardNormal';
import './VacancyListSaved.css';
import VacancyControls from './VacancyControls';

const SuggestedVacanciesList = () => {
  const mockVacancies = [
  {
    id: 1,
    name: 'Junior C# Developer',
    employer: { name: 'TechCorp' },
    area: { name: 'Минская область' },
    country: { name: 'Беларусь' },
    salary: { from: 800, to: 1200, currency: 'BYN' },
    description: '<p>Работа с ASP.NET Core, поддержка внутренней ERP системы. Требования: знание C#, базовое понимание веб-технологий, желание развиваться в IT сфере.</p>',
    publishedAt: '2025-06-05T10:30:00+03:00',
  },
  {
    id: 2,
    name: 'Trainee .NET Engineer',
    employer: { name: 'SoftSolutions' },
    area: { name: 'Гродненская область' },
    country: { name: 'Беларусь' },
    salary: { from: 500, to: 800, currency: 'BYN' },
    description: '<p>Обучение и работа над реальными задачами в команде .NET. Мы предоставим ментора и индивидуальный план развития. Опыт программирования приветствуется, но не обязателен.</p>',
    publishedAt: '2025-06-07T14:15:00+03:00',
  },
  {
    id: 3,
    name: 'Intern C# Backend Developer',
    employer: { name: 'NextGen Solutions' },
    area: { name: 'Брестская область' },
    country: { name: 'Беларусь' },
    salary: { from: 0, to: 700, currency: 'BYN' },
    description: '<p>Оплачиваемая стажировка для начинающих разработчиков. Работа с базами данных и API на C#. Изучение современных технологий разработки веб-приложений.</p>',
    publishedAt: '2025-06-08T09:45:00+03:00',
  },
  {
    id: 4,
    name: 'C# Developer (Junior)',
    employer: { name: 'DevCompany' },
    area: { name: 'Витебская область' },
    country: { name: 'Беларусь' },
    salary: { from: 900, to: 1400, currency: 'BYN' },
    description: '<p>Разработка корпоративных приложений на платформе .NET. Работа в команде опытных разработчиков. Возможность быстрого профессионального роста и изучения новых технологий.</p>',
    publishedAt: '2025-06-09T16:20:00+03:00',
  },
  {
    id: 5,
    name: 'Junior Software Engineer (.NET)',
    employer: { name: 'TechStart' },
    area: { name: 'Могилевская область' },
    country: { name: 'Беларусь' },
    salary: { from: 700, to: 1100, currency: 'BYN' },
    description: '<p>Присоединяйтесь к нашей команде разработчиков! Работа над интересными проектами с использованием современного стека технологий .NET. Гибкий график и дружелюбная атмосфера.</p>',
    publishedAt: '2025-06-10T11:30:00+03:00',
  },
  {
    id: 6,
    name: 'Стажер C# разработчик',
    employer: { name: 'CodeFactory' },
    area: { name: 'Минская область' },
    country: { name: 'Беларусь' },
    salary: { from: 600, to: 900, currency: 'BYN' },
    description: '<p>Стажировка для студентов и выпускников технических специальностей. Изучение языка C# и платформы .NET Framework. Работа под руководством опытного наставника.</p>',
    publishedAt: '2025-06-11T13:45:00+03:00',
  },
  {
    id: 7,
    name: 'Junior Backend Developer C#',
    employer: { name: 'InnovateLab' },
    area: { name: 'Гомельская область' },
    country: { name: 'Беларусь' },
    salary: { from: 800, to: 1300, currency: 'BYN' },
    description: '<p>Разработка серверной части веб-приложений. Работа с REST API, базами данных, микросервисной архитектурой. Отличная возможность для начала карьеры в IT.</p>',
    publishedAt: '2025-06-12T08:15:00+03:00',
  },
];

 const [vacancies, setVacancies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVacancies, setTotalVacancies] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState(0);
  const [salarySort, setSalarySort] = useState(0);
  const [searchTerm, setSearchTerm] = useState('Trainee C#');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchVacancies = async () => {
    // setIsLoading(true);
    
    setVacancies(mockVacancies);
    // try {
      
    //   // Пагинация
    //   const startIndex = (currentPage - 1) * itemsPerPage;
    //   const endIndex = startIndex + itemsPerPage;
    //   const paginatedVacancies = countryFiltered.slice(startIndex, endIndex);
      
    //   setVacancies(paginatedVacancies);
    //   setTotalPages(Math.ceil(countryFiltered.length / itemsPerPage));
    //   setTotalVacancies(countryFiltered.length);
    // } catch (error) {
    //   console.error('Error fetching vacancies:', error);
    //   // В случае ошибки показываем первые N вакансий
    //   const fallbackData = mockVacancies.slice(0, itemsPerPage);
    //   setVacancies(fallbackData);
    //   setTotalPages(Math.ceil(mockVacancies.length / itemsPerPage));
    //   setTotalVacancies(mockVacancies.length);
    // } finally {
    //   setIsLoading(false);
    // }
  };

   useEffect(() => {
    fetchVacancies();
  }, []);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPageNumbersToShow = 6;
    const pageNumbers = [];

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('start-ellipsis');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('end-ellipsis');
        }
        pageNumbers.push(totalPages);
      }
    }

    return (
      <div className="pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {pageNumbers.map((number, index) =>
          number === 'start-ellipsis' || number === 'end-ellipsis' ? (
            <span key={number + index} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          )
        )}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading">Загрузка вакансий...</div>
      ) : (
        <>
          <div className="vacancy-list">
            {vacancies.length > 0 ? (
              vacancies.map(vacancy => (
                <VacancyCardNormal key={vacancy.id} vacancy={vacancy} />
              ))
            ) : (
              <div className="no-vacancies">
                <p>Вакансии не найдены. Попробуйте изменить параметры поиска.</p>
              </div>
            )}
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SuggestedVacanciesList;