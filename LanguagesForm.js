// src/components/LanguagesForm.js
import React from "react";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "2rem",
};

const inputStyle = {
  padding: "0.75rem",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
};

const selectStyle = {
  ...inputStyle,
  backgroundColor: "#fff",
  color: "#000",
};

const buttonStyle = {
  padding: "0.8rem",
  background: "linear-gradient(to right, #1cd8d2, #93edc7)",
  color: "#000",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const buttonHoverStyle = {
  ...buttonStyle,
  transform: "scale(1.03)",
  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
};

const LanguagesForm = ({ formData, handleChange, handleSubmit, isEditing }) => {
  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <input
        style={inputStyle}
        type="text"
        name="language"
        value={formData.language}
        onChange={handleChange}
        placeholder="Idioma"
        required
      />

      <select
        style={selectStyle}
        name="level"
        value={formData.level}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione nivel</option>
        <option value="Básico">Básico</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
        <option value="Nativo">Nativo</option>
      </select>

      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
        onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
      >
        {isEditing ? "✏️ Actualizar idioma" : "➕ Agregar idioma"}
      </button>
    </form>
  );
};

export default LanguagesForm;
