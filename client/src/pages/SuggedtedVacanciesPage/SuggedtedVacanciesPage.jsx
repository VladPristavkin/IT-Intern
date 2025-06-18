import React, { useContext, useEffect, useState } from 'react';
import './SuggedtedVacanciesPage.css';
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu';
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import VacancyCardNormal from '../../components/vacancy/VacancyCardNormal';
import AuthContext from '../../context/AuthContext';
import { getVacanciesNormal } from '../../api/getVacanciesNormal';

// TODO: This array will be filled with actual keySkills later
const keySkills = [
  "IT-Intern",
  "C#",
  "SQL",
];

export default function SuggedtedVacanciesPage() {
  const { user } = useContext(AuthContext);
  const [suggestedVacancies, setSuggestedVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSuggestedVacancies = async () => {
      setIsLoading(true);
      try {
        const params = {
          keySkill: keySkills,
          pageSize: 10 // Limiting to 10 suggestions at a time
        };

        const response = await getVacanciesNormal(params);
        setSuggestedVacancies(response.items || []);
      } catch (error) {
        console.error('Error loading suggested vacancies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadSuggestedVacancies();
    }
  }, [user]);

  return (
    <div className='profile'>
      <StudentProfileMenu />
      <BackgroundProfile>
        <ProfileHeader text="Вакансии для вас" />
        <div className="suggested-vacancies-container">
          {isLoading ? (
            // Show loading placeholders
            Array(3).fill(null).map((_, index) => (
              <VacancyCardNormal 
                key={`loading-${index}`}
                vacancy={{}}
                isLoading={true}
              />
            ))
          ) : suggestedVacancies.length > 0 ? (
            suggestedVacancies.map(vacancy => (
              <VacancyCardNormal
                key={vacancy.id}
                vacancy={vacancy}
                isLoading={false}
              />
            ))
          ) : (
            <div className="no-suggestions">
              <p>Нет подходящих вакансий на основе ваших навыков</p>
            </div>
          )}
        </div>
      </BackgroundProfile>
    </div>
  );
}
