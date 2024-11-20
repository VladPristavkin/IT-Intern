import React from 'react';
import './EmployeeCard.css';
import LocationIconBlue from '../../assets/location-icon-blue.svg';
import SubwayIcon from '../../assets/subway.svg';
import NoLogo from "../../assets/No-Company-Logo.svg";

const EmployeeCard = ({ employer, address }) => {
  const { name } = employer;
  
  // Проверка наличия address и деструктуризация с значениями по умолчанию
  const { city = '', street = '', building = '', metro_stations = [] } = address || {};

  return (
    <div className="employee-card">
      <img className='logo-employee-card' src={employer?.logoUrl || NoLogo} alt={employer?.name || "No Company Logo"} />
      <h2 className="employer-name">{name}</h2>
      <div className="employer-address">
        <img src={LocationIconBlue} alt="Location Icon" className="location-icon" />
        {address ? (
          <span>{`${city}, ${street}, ${building}`}</span>
        ) : (
          <span>Не указан адрес</span>
        )}
      </div>
      {metro_stations.length > 0 && (
        <div className="employer-metro">
          <img src={SubwayIcon} alt="Subway Icon" className="subway-icon" />
          {metro_stations.map((station, index) => (
            <div key={index} className="metro-station">
              <span className="metro-dot" style={{ color: station.color || '#000' }}>●</span>
              {station.station_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;



