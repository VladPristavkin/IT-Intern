// import React, { useState } from 'react';
// import './VacancyControls.css';
// import MoneyIcon from '../../assets/MoneySearch.svg';
// import Calendar from '../../assets/CalendarBlank.svg';

// const VacancyControls = ({ totalVacancies }) => {
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [dateFilter, setDateFilter] = useState('');
//   const [salarySort, setSalarySort] = useState('');

//   return (
//     <div className="vacancy-controls">
//       <div className="total-vacancies">{totalVacancies} вакансий</div>

//       <div className="control-group">
//         <label className="show-much-items" htmlFor="items-per-page">Показывать по:</label>
//         <select
//           id="items-per-page"
//           value={itemsPerPage}
//           onChange={(e) => setItemsPerPage(e.target.value)}
//         >
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={30}>30</option>
//           <option value={40}>40</option>
//           <option value={50}>50</option>
//         </select>
//       </div>

//       <div className="control-group time">
//         <select
//           id="date-filter"
//           value={dateFilter}
//           onChange={(e) => setDateFilter(e.target.value)}
//           defaultValue=""
//         >
//           <option value="" disabled>
//             По дате размещения
//           </option>
//           <option value="за всё время">за всё время</option>
//           <option value="за последний месяц">за последний месяц</option>
//           <option value="за последнюю неделю">за последнюю неделю</option>
//           <option value="за последние 3 дня">за последние 3 дня</option>
//         </select>
//       </div>

//       <div className="control-group salary">
//         <select
//           id="salary-sort"
//           value={salarySort}
//           onChange={(e) => setSalarySort(e.target.value)}
//           defaultValue=""
//         >
//           <option value="" disabled>
//           По уровню З/П
//           </option>
//           <option value="по возрастанию З/П">по возрастанию З/П</option>
//           <option value="по убыванию З/П">по убыванию З/П</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default VacancyControls;





import React from 'react';
import './VacancyControls.css';

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
    <div className="vacancy-controls">
      <div className="total-vacancies">{totalVacancies} вакансий</div>

      <div className="control-group">
        <label className="show-much-items" htmlFor="items-per-page">Показывать по:</label>
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

      <div className="control-group time">
        <div className="select-wrapper">
          <select
            id="date-filter"
            value={dateFilter}
            onChange={(e) => setDateFilter(Number(e.target.value))}
          >
            <option value="">По дате размещения</option>
            <option value={0}>за всё время</option>
            <option value={30}>за последний месяц</option>
            <option value={7}>за последнюю неделю</option>
            <option value={3}>за последние 3 дня</option>
          </select>
        </div>
      </div>

      <div className="control-group salary-group">
        <div className="select-wrapper">
          <select
            id="salary-sort"
            value={salarySort}
            onChange={(e) => setSalarySort(Number(e.target.value))}
          >
            <option value="">По уровню З/П</option>
            <option value={2}>по возрастанию З/П</option>
            <option value={1}>по убыванию З/П</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VacancyControls;



