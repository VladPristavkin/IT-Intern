import axios from 'axios';

const BASE_URL = 'http://localhost:7059/api/vacancies';

export const getVacancies = async (page = 1, pageSize = 10, searchPeriod = 0, orderBy = 0, searchText = '', country = '') => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        Page: page,
        PageSize: pageSize,
        SearchPeriod: searchPeriod,
        OrderBy: orderBy,
        SearchText: searchText,
        Country: country, // добавили параметр поиска
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    throw error;
  }
};


