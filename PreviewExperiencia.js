import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getExperiences } from "../../api/experienceApi";
import { useNavigate } from "react-router-dom";

const PreviewExperiencia = () => {
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return;

      try {
        const data = await getExperiences(user.uid);
        setExperiences(data);
      } catch (error) {
        console.error("Error al cargar experiencias:", error.message);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!experiences.length) return null;

  return (
    <section className="vista-previa-section">
      <h2 style={styles.title}>Experiencia Laboral</h2>

      {/* ✅ Botón de edición - Historia de Usuario */}
      <button
        onClick={() => navigate("/experiencia")}
        style={editButtonStyle}
      >
        Editar
      </button>

      <div style={styles.list}>
        {experiences
          .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
          .map((exp) => (
            <div key={exp._id} style={styles.item}>
              <h3 style={styles.company}>{exp.company}</h3>
              <p><strong>Cargo:</strong> {exp.role}</p>
              <p><strong>Desde:</strong> {new Date(exp.startDate).toLocaleDateString()}</p>
              <p><strong>Hasta:</strong> {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Actualidad"}</p>
              <p><strong>Descripción:</strong> {exp.description}</p>
            </div>
          ))}
      </div>
    </section>
  );
};

const styles = {
  title: {
    marginBottom: "1.5rem",
    color: "#ff9800",
    fontSize: "1.8rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  item: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.15)",
    color: "#fff",
  },
  company: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#ff9800",
  },
};

const editButtonStyle = {
  backgroundColor: "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "6px 14px",
  fontSize: "0.9rem",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "1rem"
};

export default PreviewExperiencia;