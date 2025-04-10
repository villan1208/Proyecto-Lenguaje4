// src/components/EducationForm.js
import React from "react";

const EducationForm = ({ formData, handleChange, handleSubmit, isEditing }) => (
  <form className="educacion-form" onSubmit={handleSubmit}>
    <input
      name="institution"
      value={formData.institution}
      onChange={handleChange}
      placeholder="Institución"
      required
    />
    <input
      name="degree"
      value={formData.degree}
      onChange={handleChange}
      placeholder="Título obtenido"
      required
    />
    <input
      type="date"
      name="startDate"
      value={formData.startDate}
      onChange={handleChange}
      required
    />
    <input
      type="date"
      name="endDate"
      value={formData.endDate}
      onChange={handleChange}
    />
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      placeholder="Descripción"
    />
    <button type="submit">
      {isEditing ? "✏️ Actualizar educación" : "➕ Agregar educación"}
    </button>
  </form>
);

export default EducationForm;
