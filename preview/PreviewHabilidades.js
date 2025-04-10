import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getHabilidades } from "../../api/habilidadesApi";

const PreviewHabilidades = () => {
  const [habilidades, setHabilidades] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        try {
          const { data } = await getHabilidades(user.uid);
          setHabilidades(data || []);
        } catch (err) {
          console.error("Error al cargar habilidades:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!habilidades.length) return null;

  return (
    <section>
      <h2>Habilidades</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        {habilidades.map((hab) => (
          <div
            key={hab._id}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              minWidth: "180px",
              color: "#fff",
              fontSize: "0.95rem",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 6px rgba(0,0,0,0.2)",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#ff9800" }}>{hab.name}</span>
            <span style={{ fontStyle: "italic", color: "#ddd" }}>{hab.category}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviewHabilidades;









































































