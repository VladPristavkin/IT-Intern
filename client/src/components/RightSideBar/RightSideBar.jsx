import './RightSideBar.css';
import BRU from '../../assets/BRU.svg'
import { useNavigate } from 'react-router-dom';


const RightSideBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
      navigate(`/student`);
  }

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
        <button onClick={handleClick}>Перейти в профиль</button>
      </div>
    </div>
  );
};

export default RightSideBar;
