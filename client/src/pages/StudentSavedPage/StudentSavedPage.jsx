import React, { useContext, useEffect, useState } from 'react';
import './StudentSavedPage.css';
import StudentProfileMenu from '../../components/ProfileMenu/StudentProfileMenu';
import BackgroundProfile from '../../UI/shared/profileBackground/profileBackground';
import ProfileHeader from '../../UI/shared/ProfileHeader/ProfileHeader';
import SavedVacancyCard from '../../components/vacancy/SavedVacancyCard';
import AuthContext from '../../context/AuthContext';
import db from '../../utils/localDb';
import { getVacancyById } from '../../api/getVacancyById';

export default function StudentSavedPage() {
  const { user } = useContext(AuthContext);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedVacancies = async () => {
      if (!user?.userId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const userData = db.getUserById(user.userId);
        if (!userData?.savedVacancies?.length) {
          setVacancies([]);
          setLoading(false);
          return;
        }

        const vacancyPromises = userData.savedVacancies.map(id => getVacancyById(id));
        const results = await Promise.all(vacancyPromises);
        setVacancies(results.filter(Boolean));
      } catch (err) {
        console.error('Error fetching saved vacancies:', err);
        setError('Произошла ошибка при загрузке сохраненных вакансий');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedVacancies();
  }, [user?.userId]);

  const handleRemoveVacancy = async (vacancyId) => {
    try {
      const userData = db.getUserById(user.userId);
      if (!userData) return;

      const updatedVacancies = userData.savedVacancies.filter(id => id !== vacancyId);
      db.update('users', user.userId, {
        ...userData,
        savedVacancies: updatedVacancies
      });

      setVacancies(prev => prev.filter(v => v.id !== vacancyId));
    } catch (err) {
      console.error('Error removing vacancy:', err);
    }
  };

  return (
    <div className="profile">
      <StudentProfileMenu />
      <BackgroundProfile>
        <div className="saved-vacancies-container">
          <ProfileHeader text="Сохранённые вакансии" />
          <div className="saved-vacancies-list">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <SavedVacancyCard key={`loading-${index}`} vacancy={{}} isLoading={true} />
              ))
            ) : error ? (
              <div className="saved-vacancies-error">{error}</div>
            ) : vacancies.length > 0 ? (
              vacancies.map(vacancy => (
                <SavedVacancyCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  onRemove={() => handleRemoveVacancy(vacancy.id)}
                  isLoading={false}
                />
              ))
            ) : (
              <div className="saved-vacancies-empty">
                У вас пока нет сохраненных вакансий
              </div>
            )}
          </div>
        </div>
      </BackgroundProfile>
    </div>
  );
}
