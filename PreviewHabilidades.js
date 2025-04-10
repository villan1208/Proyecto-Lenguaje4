import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getHabilidades } from "../../api/habilidadesApi";
import { useNavigate } from "react-router-dom"; // ⬅️ Redirección

const PreviewHabilidades = () => {
  const [habilidades, setHabilidades] = useState([]);
  const navigate = useNavigate(); // ⬅️ Hook de navegación

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
    <section className="vista-previa-section">
      <h2>Habilidades</h2>

      {/* ✅ Historia de Usuario: Botón para editar */}
      <button
        onClick={() => navigate("/habilidades")}
        style={editButtonStyle}
      >
        Editar
      </button>

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

export default PreviewHabilidades;