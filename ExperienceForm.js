import React, { useState, useEffect } from "react";

const ExperienceForm = ({ formData, handleChange, handleSubmit, isEditing, feedback }) => {
  return (
    <div>
      {/* Feedback de éxito o error */}
      {feedback && (
        <p style={{ color: feedback.includes("✅") ? "green" : "red" }}>
          {feedback}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Empresa:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Ingrese el nombre de la empresa"
            required
          />
        </div>
        <div>
          <label>Cargo:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Ingrese su cargo"
            required
          />
        </div>
        <div>
          <label>Fecha de inicio:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de fin:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ingrese una descripción de sus responsabilidades"
            required
          />
        </div>
        <div>
          <label>Logros:</label>
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            placeholder="Ingrese logros obtenidos en este cargo"
          />
        </div>

        <button type="submit">
          {isEditing ? "Actualizar Experiencia" : "Agregar Experiencia"}
        </button>
      </form>
    </div>
  );
};

export default ExperienceForm;
