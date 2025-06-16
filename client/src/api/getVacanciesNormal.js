import axios from 'axios';

const BASE_URL = 'https://localhost:7292/vacancies';


export const getVacanciesNormal = async (params) => {
  try {
    const queryParams = new URLSearchParams();

    // Add non-array parameters
    if (params.page) queryParams.append('page', params.page);
    if (params.pageSize) queryParams.append('pageSize', params.pageSize);
    if (params.searchText) queryParams.append('searchText', params.searchText);
    if (params.searchPeriod) queryParams.append('searchPeriod', params.searchPeriod);
    if (params.orderBy) queryParams.append('orderBy', params.orderBy);
    if (params.salaryFrom) queryParams.append('salaryFrom', params.salaryFrom);
    if (params.salaryTo) queryParams.append('salaryTo', params.salaryTo);

    // Add array parameters
    if (params.country) params.country.forEach(item => queryParams.append('country', item));
    if (params.area) params.area.forEach(item => queryParams.append('area', item));
    if (params.employment) params.employment.forEach(item => queryParams.append('employment', item));
    if (params.schedule) params.schedule.forEach(item => queryParams.append('schedule', item));
    if (params.professionalRole) params.professionalRole.forEach(item => queryParams.append('professionalRole', item));
    if (params.keySkill) params.keySkill.forEach(item => queryParams.append('keySkill', item));
    if (params.experience) params.experience.forEach(item => queryParams.append('experience', item));

    console.log('Request URL:', `${BASE_URL}?${queryParams.toString()}`);
    console.log('Request params:', params);

    const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`);
    
    console.log('Raw server response:', response);
    console.log('Response data:', response.data);
    
    // Transform the response data
    const transformedVacancies = Array.isArray(response.data) 
      ? response.data.filter(vacancy => vacancy !== null)
      : response.data.items || [];

    const result = {
      items: transformedVacancies,
      totalCount: Array.isArray(response.data) 
        ? transformedVacancies.length 
        : response.data.totalCount || transformedVacancies.length
    };

    console.log('Transformed result:', result);
    return result;
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const getVacancyById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vacancy by ID:', error);
    throw error;
  }
};


