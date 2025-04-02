// import React, { useEffect, useState } from 'react';
// import VacancyCardNormal from './VacancyCardNormal';
// import VacancyControls from './VacancyControls';
// import { getVacancies } from '../../api/getVacanciesNormal.js';
// import './VacancyListNormal.css';

// const VacancyListNormal = () => {
//   const [vacancies, setVacancies] = useState([]);
//   const [totalVacancies, setTotalVacancies] = useState(0);

//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         const data = await getVacancies();
//         setVacancies(data.items);
//         setTotalVacancies(data.count);
//       } catch (error) {
//         console.error('Error fetching vacancies:', error);
//       }
//     };

//     fetchVacancies();
//   }, []);

//   return (
//     <div className="main-vacancies-list">
//       <VacancyControls totalVacancies={totalVacancies} />
//       <div className="vacancy-list">
//         {vacancies.map(vacancy => (
//           <VacancyCardNormal key={vacancy.id} vacancy={vacancy} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VacancyListNormal;





// import React, { useEffect, useState } from 'react';
// import VacancyCardNormal from './VacancyCardNormal';
// import './VacancyListNormal.css';
// import { getVacancies } from '../../api/getVacanciesNormal';

// const VacancyListNormal = () => {
//   const [vacancies, setVacancies] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         const data = await getVacancies(currentPage);
//         setVacancies(data.items);
//         setTotalPages(data.pages); // Assuming 'data.pages' provides the total number of pages
//       } catch (error) {
//         console.error('Error fetching vacancies:', error);
//       }
//     };

//     fetchVacancies();
//   }, [currentPage]);

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <div>
    
//       <div className="vacancy-list">
//         {vacancies.map(vacancy => (
//           <VacancyCardNormal key={vacancy.id} vacancy={vacancy} />
//         ))}
//       </div>
//       <div className="pagination">
//         <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VacancyListNormal;


// import React, { useEffect, useState } from 'react';
// import VacancyCardNormal from './VacancyCardNormal';
// import './VacancyListNormal.css';
// import { getVacancies } from '../../api/getVacanciesNormal';
// import VacancyControls from './VacancyControls';

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="pagination">
//       <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
//         &lt;
//       </button>
//       {pageNumbers.map(number => (
//         <button
//           key={number}
//           onClick={() => onPageChange(number)}
//           className={currentPage === number ? 'active' : ''}
//         >
//           {number}
//         </button>
//       ))}
//       <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//         &gt;
//       </button>
//     </div>
//   );
// };




// const VacancyListNormal = () => {
//   const [vacancies, setVacancies] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalVacancies, setTotalVacancies] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [dateFilter, setDateFilter] = useState(0);
//   const [salarySort, setSalarySort] = useState(0);

//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         const data = await getVacancies(currentPage, itemsPerPage, dateFilter, salarySort);
//         setVacancies(data.items);
//         setTotalPages(data.pages); // Assuming 'data.pages' provides the total number of pages
//         setTotalVacancies(data.count); // Assuming 'data.count' provides the total number of vacancies
//       } catch (error) {
//         console.error('Error fetching vacancies:', error);
//       }
//     };

//     fetchVacancies();
//   }, [currentPage, itemsPerPage, dateFilter, salarySort]);

//   return (
//     <div>
//       <VacancyControls 
//         totalVacancies={totalVacancies}
//         itemsPerPage={itemsPerPage}
//         setItemsPerPage={setItemsPerPage}
//         dateFilter={dateFilter}
//         setDateFilter={setDateFilter}
//         salarySort={salarySort}
//         setSalarySort={setSalarySort}
//       />
//       <div className="vacancy-list">
//         {vacancies.map(vacancy => (
//           <VacancyCardNormal key={vacancy.id} vacancy={vacancy} />
//         ))}
//       </div>
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// };

// export default VacancyListNormal;



import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VacancyCardNormal from './VacancyCardNormal';
import './VacancyListSaved.css';
import { getVacancies } from '../../api/getVacanciesNormal';
import VacancyControls from './VacancyControls';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const VacancyListSaved = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const [vacancies, setVacancies] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(query.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVacancies, setTotalVacancies] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(Number(query.get('itemsPerPage')) || 10);
  const [dateFilter, setDateFilter] = useState(Number(query.get('dateFilter')) || 0);
  const [salarySort, setSalarySort] = useState(Number(query.get('salarySort')) || 0);
  const [searchTerm, setSearchTerm] = useState(query.get('searchText') || '');
  const [country, setCountry] = useState(query.get('country') || '');

  const fetchVacancies = async () => {
    try {
      const data = await getVacancies(currentPage, itemsPerPage, dateFilter, salarySort, searchTerm, country);
      setVacancies(data.items);
      setTotalPages(data.pages); // Assuming 'data.pages' provides the total number of pages
      setTotalVacancies(data.count); // Assuming 'data.count' provides the total number of vacancies
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, [currentPage, itemsPerPage, dateFilter, salarySort, searchTerm, country]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage) params.append('page', currentPage);
    if (itemsPerPage) params.append('itemsPerPage', itemsPerPage);
    if (dateFilter) params.append('dateFilter', dateFilter);
    if (salarySort) params.append('salarySort', salarySort);
    if (searchTerm) params.append('searchText', searchTerm);
    if (country) params.append('country', country);
    navigate(`?${params.toString()}`, { replace: true });
  }, [currentPage, itemsPerPage, dateFilter, salarySort, searchTerm, country, navigate]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPageNumbersToShow = 6; // Изменено на 6 страниц
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
      <VacancyControls 
        totalVacancies={totalVacancies}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        salarySort={salarySort}
        setSalarySort={setSalarySort}
      />
      <div className="vacancy-list">
        {vacancies.map(vacancy => (
          <VacancyCardNormal key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default VacancyListSaved;




