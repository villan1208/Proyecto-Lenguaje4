import API from './api';

// 🟢 Crear proyecto
export const createProject = (userId, data) => {
  if (!userId) {
    console.error("❌ userId no disponible en projectApi.js");
    throw new Error("userId es requerido");
  }
  return API.post(`/projects/${userId}`, data);
};

// 🔵 Obtener proyectos de un usuario con ordenación
export const getProjects = (userId, sortOrder = "latest") => {
  return API.get(`/projects/${userId}?sortOrder=${sortOrder}`);
};

// 🟠 Actualizar proyecto
export const updateProject = (projectId, data) => API.put(`/projects/${projectId}`, data);

// 🔴 Eliminar proyecto
export const deleteProject = (projectId) => API.delete(`/projects/${projectId}`);

// ✅ Obtener el orden de los proyectos guardado en MongoDB
export const getSortOrder = (userId) => {
  if (!userId) {
    console.error("❌ userId no disponible en projectApi.js");
    throw new Error("userId es requerido");
  }
  return API.get(`/users/${userId}/sort-order`);
};

// ✅ Guardar el orden seleccionado en MongoDB
export const updateSortOrder = (userId, sortOrder) => {
  if (!userId) {
    console.error("❌ userId no disponible en projectApi.js");
    throw new Error("userId es requerido");
  }
  return API.put(`/users/${userId}/sort-order`, { sortOrder });
};
