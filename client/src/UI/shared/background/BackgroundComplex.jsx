import React from "react";
import Background from "../../../assets/Background.png";
import './BackgroundComplex.css';

function BackgroundComplex({ children }) {
  return (
    <div className="header-wrapper-page-main">
      <img src={Background} alt="background-complex" className="bg-complex"></img>
      {children}
    </div>
  );
}

export default BackgroundComplex;
