import React from 'react';
import './RightSideBar.css';
import BRU from '../../assets/BRU.svg'

const RightSideBar = () => {
  return (
    <div className="right-side-bar">
      <div className="advertisement">
        <img
          src={BRU}
          className='bru-logo'
        />
      </div>
      <div className="quick-profile">
        <h3>🚀Быстрый подбор</h3>
        <p>Пройдите тестирование и мы подберём Вам вакансии индивидуально!</p>
        <button>Перейти в профиль</button>
      </div>
    </div>
  );
};

export default RightSideBar;
