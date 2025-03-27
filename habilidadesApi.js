import axios from "axios";

const API_URL = "http://localhost:5000/api/habilidades";

// ✅ Crear habilidad → POST
export const createHabilidad = async (userId, data) => {
  return await axios.post(`${API_URL}/${userId}`, data);
};

// ✅ Obtener habilidades → GET
export const getHabilidades = async (userId) => {
  return await axios.get(`${API_URL}/${userId}`);
};

// ✅ Actualizar habilidad → PUT
export const updateHabilidad = async (userId, skillId, data) => {
  return await axios.put(`${API_URL}/${userId}/${skillId}`, data);
};

// ✅ Eliminar habilidad → DELETE
export const deleteHabilidad = async (userId, skillId) => {
  return await axios.delete(`${API_URL}/${userId}/${skillId}`);
};

















