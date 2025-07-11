import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVacancyById } from '../../api/getVacancyById';
import VacancyHeader from '../../components/vacancy/VacancyHeader';
import VacancyLeftBar from '../../components/vacancy/VacancyLeftBar';
import VacancyRightBar from '../../components/vacancy/VacancyRightBar';
import SimilarVacancies from '../../components/vacancy/SimilarVacancies';
import Header from '../../UI/shared/header/Header';
import './VacancyPage.css';
import BackgroundComplex from '../../UI/shared/background/BackgroundComplex';

const VacancyPage = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const data = await getVacancyById(id);
        console.log('Raw vacancy data:', data);
        console.log('Original vacancy URL:', data.originalVacancyUrl);
        console.log('Original vacancy URI:', data.originalVacancyUri);
        setVacancy(data);
      } catch (error) {
        console.error('Error fetching vacancy:', error);
      }
    };

    fetchVacancy();
  }, [id]);

  if (!vacancy) {
    return <div>Loading...</div>;
  }

  console.log(vacancy);

  return (
    <div className="vp-page">
      <BackgroundComplex>
        <Header className='header-vacancy-pg' />
      </BackgroundComplex>

      <div className="vp-main-container">
        <VacancyHeader vacancy={vacancy} />
        <div className="vp-content-grid">
          <VacancyLeftBar vacancy={vacancy} />
          <VacancyRightBar vacancy={vacancy} />
        </div>
        <SimilarVacancies 
          currentVacancyId={vacancy.id} 
          keySkills={vacancy.keySkills?.map(skill => skill.name) || []} 
        />
      </div>
    </div>
  );
};

export default VacancyPage;
