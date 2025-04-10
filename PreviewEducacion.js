import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getEducation } from "../../api/educationApi";
import { useNavigate } from "react-router-dom"; // ⬅️ Para redirigir al formulario

const PreviewEducacion = () => {
  const [education, setEducation] = useState([]);
  const navigate = useNavigate(); // ⬅️ Hook para redirección

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return;
      try {
        const data = await getEducation(user.uid);
        setEducation(
          data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        );
      } catch (err) {
        console.error("Error al cargar educación:", err.message);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!education.length) return null;

  return (
    <section className="vista-previa-section">
      <h2 style={styles.title}>Educación</h2>

      {/* ✅ Botón de edición según Historia de Usuario */}
      <button
        onClick={() => navigate("/educacion")}
        style={editButtonStyle}
      >
        Editar
      </button>

      <ul style={styles.list}>
        {education.map((edu) => (
          <li key={edu._id} style={styles.item}>
            <strong style={styles.institution}>{edu.institution}</strong> — {edu.degree}
            <p style={styles.dates}>
              {new Date(edu.startDate).toLocaleDateString()} -{" "}
              {edu.endDate
                ? new Date(edu.endDate).toLocaleDateString()
                : "Actualidad"}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

const styles = {
  title: {
    marginBottom: "1.2rem",
    fontSize: "1.8rem",
    color: "#ff9800",
  },
  list: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  item: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    color: "#fff",
  },
  institution: {
    fontSize: "1.2rem",
    color: "#ff9800",
  },
  dates: {
    fontSize: "0.95rem",
    marginTop: "0.4rem",
    color: "#ccc",
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

export default PreviewEducacion;