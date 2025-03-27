import API from './api';  // Asegúrate de que tienes configurado Axios o un cliente similar

// 🟢 Crear o actualizar redes sociales
export const updateSocials = (userId, data) => {
  if (!userId) {
    console.error("❌ userId no disponible en contactApi.js");
    throw new Error("userId es requerido");
  }
  return API.put(`/profile/${userId}/socials`, data);  // Usamos PUT para actualizar o crear redes sociales
};

// 🔵 Obtener redes sociales de un usuario
export const getSocials = (userId) => {
  if (!userId) {
    console.error("❌ userId no disponible en contactApi.js");
    throw new Error("userId es requerido");
  }
  return API.get(`/profile/${userId}/socials`);  // Método GET para obtener redes sociales del usuario
};

// 🟠 Eliminar una red social específica de un usuario
export const deleteSocials = (userId, network) => {
  if (!userId || !network) {
    console.error("❌ userId o red social no disponible en contactApi.js");
    throw new Error("userId y network son requeridos");
  }
  return API.delete(`/profile/${userId}/socials/${network}`);  // Método DELETE para eliminar la red social
};
