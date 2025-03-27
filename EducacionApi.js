import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/profile/';

export const addEducation = async (id, education) => {
  try {
    const response = await axios.post(`${apiUrl}${id}/education`, education);
    return response.data;
  } catch (error) {
    console.error('Error al agregar educación:', error);
  }
};

// Funciones similares para editar y eliminar
