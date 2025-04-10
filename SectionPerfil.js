import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPerfil } from "../api/perfilApi";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../styles/SectionPerfil.css";

const SectionPerfil = ({ onCompleteChange }) => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const auth = getAuth();

  useEffect(() => {
    // ✅ Inicia un listener que se ejecuta cuando cambia el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ✅ Si el usuario está autenticado, mostramos su UID y cargamos su perfil
        console.log(`✅ Firebase autenticado para UID: ${user.uid}`);
        loadProfile(user.uid); // ✅ Cargamos los datos del perfil con su UID
      } else {
        // ❌ Si no hay usuario autenticado, limpiamos y mostramos mensaje
        console.log("❌ Usuario no autenticado");
        setPerfil(null); // ⛔ Limpiamos el estado del perfil
        setError("No hay datos de perfil disponibles."); // ⛔ Mostramos error
        setLoading(false); // ⛔ Terminamos la carga
        onCompleteChange("perfil", false); // ⛔ Notificamos que la sección no está completa
      }
    });
  
    // ✅ Limpiamos el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);
  
  



  const loadProfile = async (uid) => {
    try {
      setLoading(true);
      const { data } = await getPerfil(uid);
      console.log("Perfil cargado:", data);

      if (data && Object.keys(data).length > 0) {
        setPerfil(data);
        setError("");
        onCompleteChange("perfil", true); // ✅ COMPLETO
      } else {
        setPerfil(null);
        setError("No se encontraron datos de perfil.");
        onCompleteChange("perfil", false); // ❌ INCOMPLETO
      }
    } catch (err) {
      console.error("❌ Error al cargar el perfil:", err.message);
      setPerfil(null);
      setError("Crea tu perfil.");
      onCompleteChange("perfil", false); // ❌ INCOMPLETO
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="section">
      <div className="section-header">
        <h2>Perfil Personal</h2>
        <button className="edit-btn" onClick={() => navigate("/perfil")}>
          {perfil ? "Editar" : "Crear"}
        </button>
      </div>

      {perfil ? (
        <div>
          <p><strong>Nombre:</strong> {perfil.name}</p>
          <p><strong>Profesión:</strong> {perfil.profession}</p>
          <p><strong>Email:</strong> {perfil.email}</p>
          <p><strong>Teléfono:</strong> {perfil.phone}</p>
          <p><strong>Ubicación:</strong> {perfil.location}</p>
        </div>
      ) : (
        <p style={{ color: "#888" }}>{error || "No hay perfil disponible."}</p>
      )}
    </div>
  );
};

export default SectionPerfil;





















































