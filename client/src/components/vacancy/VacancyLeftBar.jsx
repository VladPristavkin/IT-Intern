import React from "react";
import './VacancyLeftBar.css'

const VacancyLeftBar = ({ vacancy }) => {
  const { description } = vacancy;

  return (
    <div className="vlb-container">
      <h2 className="vlb-main-header">Описание вакансии</h2>
      <div
        className="vlb-description-wrapper"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default VacancyLeftBar;
