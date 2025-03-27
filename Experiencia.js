import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExperienceForm from "../../components/ExperienceForm";
import { getExperiences, createExperience, updateExperience, deleteExperience } from "../../api/experienceApi";
import "../../styles/Experiencia.css";

const Experiencia = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    achievements: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getExperiences();
        setExperiences(data);
      } catch (error) {
        setFeedback("❌ Error al cargar experiencias.");
      }
    };
    fetchExperiences();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    try {
      if (isEditing) {
        await updateExperience(formData.id, formData);
        setFeedback("✅ Experiencia actualizada correctamente");
      } else {
        await createExperience(formData);
        setFeedback("✅ Experiencia agregada correctamente");
      }

      const data = await getExperiences();
      setExperiences(data);
      setIsEditing(false);
      setFormData({ company: "", role: "", startDate: "", endDate: "", description: "", achievements: "" });
    } catch (error) {
      setFeedback(`❌ Error: ${error.message}`);
    }
  };

  const handleDelete = async (expId) => {
    try {
      await deleteExperience(expId);
      const data = await getExperiences();
      setExperiences(data);
    } catch (error) {
      setFeedback(`❌ Error al eliminar experiencia: ${error.message}`);
    }
  };

  const handleEdit = (exp) => {
    setFormData(exp);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <div className="contentBox">
        <h2>Gestión de Experiencia Laboral</h2>
        {feedback && (
          <p className={`feedback ${feedback.includes("✅") ? "success" : "error"}`}>
            {feedback}
          </p>
        )}
  
        <ExperienceForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          feedback={feedback}
        />
  
        <h3>Mis Experiencias Laborales</h3>
        <div className="experienceList">
          {experiences.length === 0 ? (
            <p>No tienes experiencias laborales registradas.</p>
          ) : (
            experiences
              .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
              .map((exp) => (
                <div className="experienceItem" key={exp._id}>
                  <h4>{exp.company}</h4>
                  <p><strong>Cargo:</strong> {exp.role}</p>
                  <p><strong>Periodo:</strong> {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Actualidad"}</p>
                  <p><strong>Descripción:</strong> {exp.description}</p>
                  <p><strong>Logros:</strong> {exp.achievements}</p>
                  <div className="buttons">
                    <button className="editButton" onClick={() => handleEdit(exp)}>Editar</button>
                    <button className="deleteButton" onClick={() => handleDelete(exp._id)}>Eliminar</button>
                  </div>
                </div>
              ))
          )}
        </div>
  
        <button className="backButton" onClick={() => navigate("/home")}>Regresar</button>
      </div>
    </div>
  );
};

// Exportar como default
export default Experiencia;
