import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getPerfil } from "../../api/perfilApi";
import { useNavigate } from "react-router-dom"; // ⬅️ Para redirigir

const PreviewUsuario = () => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ⬅️ Redirección al formulario de perfil

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        try {
          const { data } = await getPerfil(user.uid);
          if (data && Object.keys(data).length > 0) {
            setPerfil(data);
            setError("");
          } else {
            setPerfil(null);
            setError("No se encontraron datos de usuario.");
          }
        } catch (err) {
          console.error("❌ Crea tu perfil:", err);
          setPerfil(null);
          setError("Crea tu perfil.");
        } finally {
          setLoading(false);
        }
      } else {
        setPerfil(null);
        setError("Usuario no autenticado.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Cargando datos del usuario...</p>;

  return (
    <section>
      <h2>Información del Usuario</h2>

      {/* ✅ Historia de Usuario: botón que redirige al formulario de edición */}
      <button
        onClick={() => navigate("/perfil")}
        style={editButtonStyle}
      >
        Editar
      </button>

      {perfil ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          background: "rgba(255,255,255,0.05)",
          padding: "1rem",
          borderRadius: "10px"
        }}>
          <p><strong style={{ color: "#ff9800" }}>Nombre:</strong> {perfil.name}</p>
          <p><strong style={{ color: "#ff9800" }}>Profesión:</strong> {perfil.profession}</p>
          <p><strong style={{ color: "#ff9800" }}>Email:</strong> {perfil.email}</p>
          <p><strong style={{ color: "#ff9800" }}>Teléfono:</strong> {perfil.phone}</p>
          <p><strong style={{ color: "#ff9800" }}>Ubicación:</strong> {perfil.location}</p>
        </div>
      ) : (
        <p style={{ color: "#aaa" }}>{error || "No hay datos disponibles."}</p>
      )}
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

export default PreviewUsuario;