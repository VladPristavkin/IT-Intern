import React from 'react';
import EmployeeCard from './EmployeeCard';
import VacancyOverview from './VacancyOverview';
import './VacancyRightBar.css';

const VacancyRightBar = ({ vacancy }) => {
  const { employer, address } = vacancy;

  return (
    <div className="vacancy-right-bar">
      <EmployeeCard employer={employer} address={address} />
      <VacancyOverview vacancy={vacancy} />
    </div>
  );
};

export default VacancyRightBar;

