import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getIdiomas } from "../api/idiomasApi";
import { useNavigate } from "react-router-dom";

const SectionIdiomas = ({ onCompleteChange }) => {
  const [idiomas, setIdiomas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        onCompleteChange("idiomas", false);
        return;
      }

      getIdiomas(user.uid)
        .then((data) => {
          setIdiomas(data);
          onCompleteChange("idiomas", data.length > 0);
        })
        .catch((error) => {
          console.error("❌ Error al cargar idiomas:", error);
          onCompleteChange("idiomas", false);
        });
    });

    return () => unsubscribe();
  }, []);

  const buttonStyle = {
    backgroundColor: "#ff9800",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease, transform 0.2s ease"
  };

  return (
    <div className="section">
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ff9800", paddingBottom: "10px" }}>
        <h2>Idiomas</h2>
        <button
          onClick={() => navigate("/idiomas")}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e68900")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff9800")}
        >
          Editar
        </button>
      </div>

      <ul style={{ marginTop: "15px", paddingLeft: "20px", lineHeight: "1.6" }}>
        {idiomas.map((lang) => (
          <li key={lang._id}>
            <strong>{lang.language}</strong>: {lang.level}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionIdiomas;






































