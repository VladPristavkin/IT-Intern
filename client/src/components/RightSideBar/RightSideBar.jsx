import React from 'react';
import './RightSideBar.css';

const RightSideBar = () => {
  return (
    <div className="right-side-bar">
      <div className="advertisement">
        <h3>Тут будет реклама</h3>
        <p>Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea foes.</p>
      </div>

      <div className="newsletter-subscription">
        <h3>Подписаться на новости</h3>
        <input type="email" placeholder="name@mail.com" />
        <button>Подписаться</button>
      </div>

      <div className="quick-profile">
        <h3>Быстрый подбор</h3>
        <p>Quis eiusmod deserunt cillum laboris magna cupidatat esse labore irure quis cupidatat in.</p>
        <button>Перейти в профиль</button>
      </div>
    </div>
  );
};

export default RightSideBar;
