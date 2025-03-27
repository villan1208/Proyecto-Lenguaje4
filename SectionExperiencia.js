// src/components/SectionExperiencia.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getExperiences } from "../api/experienceApi";  // Asegúrate de tener la función en tu API

const SectionExperiencia = () => {
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  // Cargar las experiencias laborales al montar el componente
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getExperiences();  // API para obtener las experiencias
        setExperiences(data);  // Actualiza el estado con las experiencias obtenidas
      } catch (error) {
        console.error("❌ Error al cargar experiencias:", error.message);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <div className="section">
      <div className="section-header">
        <h2>Experiencia Laboral</h2>
        <button className="edit-btn" onClick={() => navigate("/experiencia")}>
          Editar
        </button>
      </div>

      {experiences.length === 0 ? (
        <p>Aquí irá la información de experiencia laboral...</p>  // Si no hay experiencias
      ) : (
        <div>
          {experiences.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).map((exp) => (
            <div key={exp._id} className="experience-item">
              <h3>{exp.company}</h3>
              <p><strong>Cargo:</strong> {exp.role}</p>
              <p><strong>Fecha de inicio:</strong> {new Date(exp.startDate).toLocaleDateString()}</p>
              <p><strong>Fecha de fin:</strong> {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Actualidad"}</p>
              <p><strong>Descripción:</strong> {exp.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionExperiencia;

















