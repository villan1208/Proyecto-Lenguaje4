// src/api/EducacionApi.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/profile/';

// Crear una nueva entrada de educación
export const addEducation = async (userId, education) => {
  try {
    const response = await axios.post(`${apiUrl}${userId}/education`, education);
    return response.data;
  } catch (error) {
    console.error('Error al agregar educación:', error);
  }
};

// Obtener todas las entradas de educación de un usuario
export const getEducations = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}${userId}/education`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener educación:', error);
  }
};

// Actualizar una entrada de educación
export const updateEducation = async (id, education) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/education/${id}`, education);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar educación:', error);
  }
};

// Eliminar una entrada de educación
export const deleteEducation = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/education/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar educación:', error);
  }
};
