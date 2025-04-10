import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getIdiomas } from "../../api/idiomasApi";
import { useNavigate } from "react-router-dom"; // ⬅️ Navegación

const PreviewIdiomas = () => {
  const [idiomas, setIdiomas] = useState([]);
  const navigate = useNavigate(); // ⬅️ Hook para ir a /idiomas

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return;

      try {
        const data = await getIdiomas(user.uid);
        setIdiomas(data);
      } catch (error) {
        console.error("Error al cargar idiomas:", error.message);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!idiomas.length) return null;

  return (
    <section className="vista-previa-section">
      <h2 style={styles.title}>Idiomas</h2>

      {/* ✅ Botón de edición - Historia de Usuario */}
      <button
        onClick={() => navigate("/idiomas")}
        style={editButtonStyle}
      >
        Editar
      </button>

      <ul style={styles.list}>
        {idiomas.map((lang) => (
          <li key={lang._id} style={styles.item}>
            <strong style={styles.language}>{lang.language}</strong>:{" "}
            <span style={styles.level}>{lang.level}</span>
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
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  item: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "1.1rem",
  },
  language: {
    color: "#ff9800",
    fontWeight: "bold",
  },
  level: {
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

export default PreviewIdiomas;