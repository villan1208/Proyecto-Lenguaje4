import API from './api';

// 🟢 Crear referencia
export const createReference = (userId, data) => {
  if (!userId) {
    console.error("❌ userId no disponible en referenceApi.js");
    throw new Error("userId es requerido");
  }
  return API.post(`/references/${userId}`, data);
};

// 🔵 Obtener referencias
export const getReferences = (userId) => {
  if (!userId) {
    console.error("❌ userId no disponible en referenceApi.js");
    throw new Error("userId es requerido");
  }
  return API.get(`/references/${userId}`);
};

// 🟠 Actualizar referencia
export const updateReference = (refId, data) => {
  if (!refId) {
    console.error("❌ refId no disponible en referenceApi.js");
    throw new Error("refId es requerido");
  }
  return API.put(`/references/${refId}`, data);
};

// 🔴 Eliminar referencia
export const deleteReference = (refId) => {
  if (!refId) {
    console.error("❌ refId no disponible en referenceApi.js");
    throw new Error("refId es requerido");
  }
  return API.delete(`/references/${refId}`);
};
