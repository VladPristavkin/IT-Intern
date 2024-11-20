import React from "react";
import './VacancyLeftBar.css'

const VacancyLeftBar = ({ vacancy }) => {
  const { description } = vacancy;

  return (
    <div className="vacancy-left-bar">
      <h2 className="description-header-vacancy">Описание вакансии</h2>
      <div
        className="vacancy-description-full"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default VacancyLeftBar;
