import React from 'react';
import './EmployeeCard.css';
import LocationIcon from '../../assets/MapPin.svg';
import NoLogo from "../../assets/No-Company-Logo.svg";

const EmployeeCard = ({ employer, address }) => {
  const { name } = employer;
  const { city = '', street = '', building = '' } = address || {};
  
  const fullAddress = [city, street, building].filter(Boolean).join(', ');

  return (
    <div className="employee-card">
      <div className="employer-info">
        <div className="logo-container">
          <img 
            className='company-logo' 
            src={employer?.logoUri || NoLogo} 
            alt={employer?.name || "Company Logo"} 
          />
        </div>
        <h2 className="employer-name">{name}</h2>
        {address && (
          <div className="employer-address">
            <img src={LocationIcon} alt="Location" className="location-icon" />
            <span>{fullAddress}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;



