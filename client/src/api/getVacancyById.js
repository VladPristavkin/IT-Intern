import axios from 'axios';

const BASE_URL = 'https://localhost:7292/vacancies';

export const getVacancyById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vacancy by ID:', error);
    throw error;
  }
};
