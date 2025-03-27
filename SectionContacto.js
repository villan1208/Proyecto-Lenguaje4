import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSocials } from "../api/contactApi"; // Asegúrate de que esta función está en tu archivo contactApi.js
import "../styles/SectionContacto.css";


import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa"; // Asegúrate de tener estos íconos de react-icons importados

const SectionContacto = ({ userId }) => {
  const navigate = useNavigate();
  const [socials, setSocials] = useState({});

  // Obtener redes sociales del backend cuando se monte el componente
  useEffect(() => {
    const loadSocials = async () => {
      try {
        // Verificar que el userId esté disponible antes de hacer la llamada
        if (userId) {
          const { data } = await getSocials(userId);  // Obtener las redes sociales del backend
          console.log("✅ Redes sociales obtenidas desde la API:", data);

          // Filtramos las claves no deseadas (como _id, userId, createdAt, etc.)
          const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
            if (["linkedin", "github", "twitter", "facebook", "instagram"].includes(key) && value) {
              acc[key] = value;
            }
            return acc;
          }, {});

          setSocials(filteredData);  // Guardamos las redes sociales en el estado
        }
      } catch (error) {
        console.error("❌ Error al obtener redes sociales:", error.message);
      }
    };

    if (userId) {
      loadSocials();
    }
  }, [userId]); // Dependencia para que se ejecute al cambiar el userId

  // Mapeo de redes sociales a íconos
  const iconMap = {
    github: <FaGithub size={40} color="#333" />,
    linkedin: <FaLinkedin size={40} color="#0077B5" />,
    twitter: <FaTwitter size={40} color="#1DA1F2" />,
    facebook: <FaFacebook size={40} color="#1877F2" />,
    instagram: <FaInstagram size={40} color="#E1306C" />,
  };

  // Función para extraer el nombre de usuario de la URL
  const getUsernameFromUrl = (url) => {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1]; // El último segmento de la URL es el nombre de usuario
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>Contactos</h2>
        <button className="edit-btn" onClick={() => navigate("/contactos")}>
          Editar
        </button>
      </div>

      {/* Mostrar solo las redes sociales filtradas */}
      {Object.keys(socials).length > 0 ? (
        <div className="socials-list">
          {Object.entries(socials).map(([key, value]) => (
            <div key={key} className="social-card">
              <p>
                {/* Ícono clicable con su enlace */}
                <a href={value} target="_blank" rel="noopener noreferrer">
                  {iconMap[key]}
                </a>
                {/* Solo mostrar el nombre de usuario, no la URL completa */}
                <a href={value} target="_blank" rel="noopener noreferrer">
                  {getUsernameFromUrl(value)}
                </a>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes redes sociales guardadas.</p>
      )}
    </div>
  );
};

export default SectionContacto;
