import React from "react";
import Background from "../../../assets/Background.png";

function BackgroundComplex({ children }) {
  return (
    <>
      <img src={Background} alt="background-complex" className="bg-complex"></img>
      {children}
    </>
  );
}

export default BackgroundComplex;
