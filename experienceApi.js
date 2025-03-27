import axios from "axios";

const API_URL = "http://localhost:5000/api/experiences";

// Obtener experiencias laborales
export const getExperiences = async () => {
  const response = await axios.get(`${API_URL}/userId`);  // Reemplaza 'userId' con el id real
  return response.data.experiences;
};

// Crear una nueva experiencia laboral
export const createExperience = async (data) => {
  return await axios.post(`${API_URL}/userId`, data);  // Reemplaza 'userId' con el id real
};

// Actualizar experiencia laboral
export const updateExperience = async (expId, data) => {
  return await axios.put(`${API_URL}/userId/experience/${expId}`, data);  // Reemplaza 'userId' y 'expId'
};

// Eliminar experiencia laboral
export const deleteExperience = async (expId) => {
  return await axios.delete(`${API_URL}/userId/experience/${expId}`);  // Reemplaza 'userId' y 'expId'
};


















