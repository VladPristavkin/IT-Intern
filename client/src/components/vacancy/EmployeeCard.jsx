import React from 'react';
import './EmployeeCard.css';
import LocationIcon from '../../assets/MapPin.svg';
import NoLogo from "../../assets/No-Company-Logo.svg";

const EmployeeCard = ({ employer, address }) => {
  const { name } = employer;
  const { city = '', street = '', building = '' } = address || {};
  
  const fullAddress = [city, street, building].filter(Boolean).join(', ');

  return (
    <div className="ec-container">
      <div className="ec-info-wrapper">
        <div className="ec-logo-container">
          <img 
            className='ec-logo' 
            src={employer?.logoUri || NoLogo} 
            alt={employer?.name || "Company Logo"} 
          />
        </div>
        <h2 className="ec-company-name">{name}</h2>
        {address && (
          <div className="ec-address-container">
            <img src={LocationIcon} alt="Location" className="ec-location-icon" />
            <span>{fullAddress}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;



