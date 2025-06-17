import React, { useState, useRef, useEffect } from 'react';
import MoneyIcon from '../../assets/MoneySearch.svg';
import CalendarIcon from '../../assets/CalendarBlankBlack.svg';

const VacancyControls = ({
  totalVacancies = 3177,
  itemsPerPage = 10,
  setItemsPerPage = () => {},
  dateFilter = null,
  setDateFilter = () => {},
  salarySort = null,
  setSalarySort = () => {}
}) => {
  const [activeFilter, setActiveFilter] = useState('date'); // какой фильтр показывает текст
  const [expandedFilter, setExpandedFilter] = useState(null); // какой dropdown открыт
  const dateFilterRef = useRef(null);
  const salaryFilterRef = useRef(null);

  // Обработчик клика вне области фильтров
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        expandedFilter &&
        dateFilterRef.current &&
        salaryFilterRef.current &&
        !dateFilterRef.current.contains(event.target) &&
        !salaryFilterRef.current.contains(event.target)
      ) {
        setExpandedFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedFilter]);

  const handleFilterClick = (filter) => {
    // Устанавливаем активный фильтр
    setActiveFilter(filter);
    
    // Если dropdown уже открыт для этого фильтра, закрываем его
    if (expandedFilter === filter) {
      setExpandedFilter(null);
    } else {
      // Иначе открываем dropdown
      setExpandedFilter(filter);
    }
  };

  // const MoneyIcon = () => (
  //   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  //     <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  //     <path d="M7.5 8.75C7.5 8.08696 7.76339 7.45107 8.23223 6.98223C8.70107 6.51339 9.33696 6.25 10 6.25C10.663 6.25 11.2989 6.51339 11.7678 6.98223C12.2366 7.45107 12.5 8.08696 12.5 8.75C12.5 9.41304 12.2366 10.0489 11.7678 10.5178C11.2989 10.9866 10.663 11.25 10 11.25C9.33696 11.25 8.70107 11.5134 8.23223 11.9822C7.76339 12.4511 7.5 13.087 7.5 13.75C7.5 14.413 7.76339 15.0489 8.23223 15.5178C8.70107 15.9866 9.33696 16.25 10 16.25C10.663 16.25 11.2989 15.9866 11.7678 15.5178C12.2366 15.0489 12.5 14.413 12.5 13.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  //     <path d="M10 4.375V6.25M10 16.25V13.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  //   </svg>
  // );

  // const CalendarIcon = () => (
  //   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  //     <path d="M2.5 5H17.5V17.5H2.5V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  //     <path d="M13.75 2.5V5M6.25 2.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  //     <path d="M2.5 8.75H17.5" stroke="currentColor" strokeWidth="1.5"/>
  //   </svg>
  // );

  const ChevronIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const getDateFilterText = () => {
    switch(dateFilter) {
      case 30: return 'За месяц';
      case 7: return 'За неделю';
      case 3: return 'За 3 дня';
      case 0: return 'По дате размещения';
      default: return 'По дате размещения';
    }
  };

  const getSalaryFilterText = () => {
    switch(salarySort) {
      case 1: return 'По убыванию З/П';
      case 2: return 'По возрастанию З/П';
      case 0:
      default: return 'По зарплате';
    }
  };

  const handleDateFilterSelect = (value) => {
    setDateFilter(value);
    setExpandedFilter(null); // Закрываем dropdown после выбора
  };

  const handleSalaryFilterSelect = (value) => {
    setSalarySort(value);
    setExpandedFilter(null); // Закрываем dropdown после выбора
  };

  // Определяем, показывать ли текст для каждого фильтра
  const showDateText = activeFilter === 'date';
  const showSalaryText = activeFilter === 'salary';

  return (
    <div style={{
      // padding: '10px',
      backgroundColor: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '22px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1a1a1a',
          margin: 0
        }}>
          {totalVacancies} Вакансий
        </h1>

        {/* Items per page */}
        <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            // gap: '8px'
          }}>
            <span style={{
              color: '#18191c',
              fontSize: '16px'
            }}>
              Показывать
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              style={{
                // padding: '6px 12px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '16px',
                color: '#295AAF',
                textDecoration: 'underline',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value={10}>по 10</option>
              <option value={20}>по 20</option>
              <option value={30}>по 30</option>
              <option value={40}>по 40</option>
              <option value={50}>по 50</option>
            </select>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Date filter */}
          <div style={{ position: 'relative' }} ref={dateFilterRef}>
            <button
              onClick={() => handleFilterClick('date')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: showDateText ? '12px 16px' : '10px 9px',
                backgroundColor: '#fff',
                border: '1px solid #E7E9ED',
                borderRadius: '8px',
                color: '#18191c',
                cursor: 'pointer',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease',
                height: '48px',
                minWidth: showDateText ? 'auto' : '44px',
                whiteSpace: 'nowrap'
              }}
            >
              <img
                src={CalendarIcon}
                style={{ height: '22.5px', width: '22.5px'}}
              />
              {showDateText && (
                <>
                  <span>{getDateFilterText()}</span>
                  {expandedFilter === 'date' && <ChevronIcon />}
                </>
              )}
            </button>

            {expandedFilter === 'date' && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                minWidth: '200px',
                zIndex: 10,
                padding: '8px'
              }}>
                {[
                  { value: 30, label: 'За месяц' },
                  { value: 7, label: 'За неделю' },
                  { value: 3, label: 'За 3 дня' },
                  { value: 0, label: 'По дате размещения' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleDateFilterSelect(option.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: (dateFilter === option.value && option.value !== 0) ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      textAlign: 'left',
                      color: (dateFilter === option.value && option.value !== 0) ? '#4a90e2' : '#18191c',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: (dateFilter === option.value && option.value !== 0) ? '500' : '400',
                      transition: 'all 0.2s ease',
                      marginBottom: '2px'
                    }}
                    onMouseEnter={(e) => {
                      if (dateFilter !== option.value) {
                        e.target.style.backgroundColor = 'rgba(74, 144, 226, 0.05)';
                        e.target.style.color = '#4a90e2';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (dateFilter !== option.value) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#666';
                      }
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Salary filter */}
          <div style={{ position: 'relative' }} ref={salaryFilterRef}>
            <button
              onClick={() => handleFilterClick('salary')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: showSalaryText ? '12px 16px' : '10px 9px',
                backgroundColor: '#fff',
                border: '1px solid #E7E9ED',
                borderRadius: '8px',
                color: '#18191c',
                cursor: 'pointer',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease',
                height: '48px',
                width: showSalaryText ? 'auto' : '44px',
                whiteSpace: 'nowrap'
              }}
            >
              <img
                src={MoneyIcon}
              />
              {showSalaryText && (
                <>
                  <span>{getSalaryFilterText()}</span>
                  {expandedFilter === 'salary' && <ChevronIcon />}
                </>
              )}
            </button>

            {expandedFilter === 'salary' && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                minWidth: '200px',
                zIndex: 10,
                padding: '8px'
              }}>
                {[
                  { value: 0, label: 'По умолчанию' },
                  { value: 1, label: 'По убыванию З/П' },
                  { value: 2, label: 'По возрастанию З/П' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleSalaryFilterSelect(option.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: (salarySort === option.value && option.value !== 0) ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      textAlign: 'left',
                      color: (salarySort === option.value && option.value !== 0) ? '#4a90e2' : '#18191c',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: (salarySort === option.value && option.value !== 0) ? '500' : '400',
                      transition: 'all 0.2s ease',
                      marginBottom: '2px'
                    }}
                    onMouseEnter={(e) => {
                      if (salarySort !== option.value) {
                        e.target.style.backgroundColor = 'rgba(74, 144, 226, 0.05)';
                        e.target.style.color = '#4a90e2';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (salarySort !== option.value) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#666';
                      }
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyControls;