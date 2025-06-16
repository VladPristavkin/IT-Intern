import axios from 'axios';

const BASE_URL = 'https://localhost:7292/auxiliary';

export const getAuxiliaryData = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching auxiliary data:', error);
    throw error;
  }
};

export const getCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/countries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const getAreas = async (countryId) => {
  try {
    const url = countryId 
      ? `${BASE_URL}/countries/${countryId}` 
      : `${BASE_URL}/areas`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching areas:', error);
    throw error;
  }
};

export const getEmployments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/employments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employments:', error);
    throw error;
  }
};

export const getExperiences = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/experiences`);
    return response.data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};

export const getSchedules = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/schedules`);
    return response.data;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    throw error;
  }
};

export const getKeySkills = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/keyskills`);
    return response.data;
  } catch (error) {
    console.error('Error fetching key skills:', error);
    throw error;
  }
};

export const getProfessionalRoles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/professional_roles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching professional roles:', error);
    throw error;
  }
}; 