import axios from 'axios';

const VACANCY_URL = 'https://localhost:7292/vacancies?SearchText';

export const getVacancies = async () => {
  try {
    const response = await axios.get(VACANCY_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    throw error;
  }
};