import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getEducation } from "../api/educationApi";
import { useNavigate } from "react-router-dom";

const SectionEducacion = ({ onCompleteChange }) => {
  const [education, setEducation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        onCompleteChange("educacion", false);
        return;
      }

      getEducation(user.uid)
        .then((data) => {
          setEducation(data);
          onCompleteChange("educacion", data.length > 0);
        })
        .catch((error) => {
          console.error("❌ Error al cargar educación:", error);
          onCompleteChange("educacion", false);
        });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className="section"
      style={{
        padding: "20px",
        backgroundColor: "#2a3b4c",
        color: "white",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #ff9800",
          paddingBottom: "10px",
        }}
      >
        <h2>Educación</h2>
        <button
          onClick={() => navigate("/educacion")}
          style={{
            backgroundColor: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 14px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Editar
        </button>
      </div>

      <ul style={{ marginTop: "1rem", paddingLeft: "1rem" }}>
        {education.map((edu) => (
          <li key={edu._id} style={{ marginBottom: "1rem" }}>
            <strong style={{ color: "#ff9800" }}>{edu.institution}</strong> - {edu.degree}
            <p style={{ color: "#ccc", marginTop: "0.4rem" }}>
              {new Date(edu.startDate).toLocaleDateString()} -{" "}
              {edu.endDate
                ? new Date(edu.endDate).toLocaleDateString()
                : "Actualidad"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionEducacion;




























































