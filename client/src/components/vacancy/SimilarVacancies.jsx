import React, { useEffect, useState, useCallback } from 'react';
import { getVacanciesNormal } from '../../api/getVacanciesNormal';
import SimilarVacancyCard from './SimilarVacancyCard';
import './VacancyListNormal.css';

const SimilarVacancies = ({ currentVacancyId, keySkills }) => {
  const [similarVacancies, setSimilarVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSimilarVacancies = useCallback(async () => {
    if (!keySkills?.length) {
      setLoading(false);
      return;
    }

    try {
      // Take the most relevant skill to reduce query complexity
      const mainSkill = keySkills[0];
      
      const params = {
        keySkill: [mainSkill, 'IT-Intern'],
        pageSize: 4, // Fetch 4 to ensure we have enough after filtering
        page: 1
      };

      const result = await getVacanciesNormal(params);
      const filteredVacancies = result.items
        .filter(vacancy => vacancy.id !== currentVacancyId)
        .slice(0, 3);

      setSimilarVacancies(filteredVacancies);
    } catch (error) {
      console.error('Error fetching similar vacancies:', error);
    } finally {
      setLoading(false);
    }
  }, [keySkills, currentVacancyId]);

  useEffect(() => {
    fetchSimilarVacancies();
  }, [fetchSimilarVacancies]);

  if (loading) {
    return <div className="similar-vacancies-loading">Загрузка похожих вакансий...</div>;
  }

  if (!similarVacancies.length) {
    return null;
  }

  return (
    <div className="similar-vacancies">
      <h2 className="similar-vacancies-title">Похожие вакансии</h2>
      <div className="similar-vacancies-grid">
        {similarVacancies.map((vacancy) => (
          <div key={`similar-vacancy-${vacancy.id}`}>
            <SimilarVacancyCard vacancy={vacancy} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarVacancies; 