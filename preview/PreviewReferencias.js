import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getMongoUserId } from "../../services/firebase";
import { getReferences } from "../../api/referenceApi";

const PreviewReferencias = () => {
  const [references, setReferences] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        getMongoUserId(user.uid)
          .then((mongoId) => {
            if (mongoId) setUserId(mongoId);
          })
          .catch((error) =>
            console.error("Error al obtener userId desde MongoDB:", error)
          );
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadReferences = async () => {
      try {
        if (userId) {
          const { data } = await getReferences(userId);
          setReferences(data);
        }
      } catch (error) {
        console.error("Error al obtener referencias:", error.message);
      }
    };

    loadReferences();
  }, [userId]);

  if (!references.length) return null;

  return (
    <section className="vista-previa-section">
      <h2 style={{ marginBottom: "1.2rem" }}>Referencias / Testimonios</h2>
      <div style={styles.grid}>
        {references.map((ref) => (
          <div key={ref._id} style={styles.card}>
            <h3 style={styles.name}>{ref.name}</h3>
            <p style={styles.relation}>
              <strong>Relación:</strong> {ref.relationship}
            </p>
            <p style={styles.testimony}>
              <strong>Testimonio:</strong> {ref.testimony}
            </p>
            {ref.imageURL && (
              <img
                src={ref.imageURL}
                alt={ref.name}
                style={styles.image}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: "10px",
    padding: "1.5rem 1rem",
    color: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  name: {
    fontSize: "1.3rem",
    color: "#ff9800",
    marginBottom: "0.5rem",
  },
  relation: {
    fontSize: "1rem",
    marginBottom: "0.3rem",
  },
  testimony: {
    fontSize: "1rem",
    fontStyle: "italic",
    marginBottom: "1rem",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
    borderRadius: "8px",
    border: "2px solid #ff9800",
    backgroundColor: "#1a1a1a",
    display: "block",
    margin: "0 auto",
  },
};

export default PreviewReferencias;



































































































