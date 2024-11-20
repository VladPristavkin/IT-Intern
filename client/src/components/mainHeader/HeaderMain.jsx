import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HeaderMain.css';

const HeaderMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  
  const query = useQuery();
  
  const [searchTerm, setSearchTerm] = useState(query.get('searchText') || '');
  const [country, setCountry] = useState(query.get('country') || '');

  // const handleSearch = () => {
  //   const params = new URLSearchParams();
  //   if (searchTerm) params.append('searchText', searchTerm);
  //   if (country) params.append('country', country);
  //   navigate(`/search?${params.toString()}`);
  // };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('searchText', searchTerm);
    if (country) params.append('country', country);
    navigate(`/search?${params.toString()}`); // Удалено `{ replace: true }`
  };
  
  

  useEffect(() => {
    setSearchTerm(query.get('searchText') || '');
    setCountry(query.get('country') || '');
  }, [location.search]);

  return (
    <div className="header-main">
      <div className="header-content">
        <h1 className="main-title">
          Найди <span className="highlighted">работу</span> уже сегодня!
        </h1>
        <p className="slogan">
          Вас ждут тысячи вакансий в компьютерной, инженерной и технологической сферах.
        </p>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Какую работу вы ищете?" 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="country-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="" disabled>Выберите страну</option>
            <option value="16">Беларусь</option>
            <option value="113">Россия</option>
            <option value="">Неважно</option>
          </select>
          <button className="search-button" onClick={handleSearch}>Искать работу</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;







