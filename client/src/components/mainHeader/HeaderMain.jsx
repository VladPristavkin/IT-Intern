import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuxiliaryData } from '../../api/getAuxiliaryData';
import './HeaderMain.css';

const HeaderMain = ({ onSearch, initialCountry = '', initialSearchText = '' }) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearchText);
  const [country, setCountry] = useState(initialCountry);
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAuxiliaryData();
        setCountries(data.countries || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Синхронизация с внешними значениями
  useEffect(() => {
    setCountry(initialCountry);
  }, [initialCountry]);

  useEffect(() => {
    setSearchTerm(initialSearchText);
  }, [initialSearchText]);

  const handleSearch = () => {
    navigate('/search', { replace: true });
    if (onSearch) {
      onSearch({
        searchText: searchTerm,
        country: country
      });
    }
  };

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
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <select 
            className="country-select"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              onSearch({
                searchText: searchTerm,
                country: e.target.value
              });
            }}
          >
            <option value="">Не имеет значения</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>
          <button className="search-button" onClick={handleSearch}>
            Искать работу
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;







