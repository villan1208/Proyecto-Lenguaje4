import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getIdiomas } from "../../api/idiomasApi";

const PreviewIdiomas = () => {
  const [idiomas, setIdiomas] = useState([]);

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

export default PreviewIdiomas;





























































