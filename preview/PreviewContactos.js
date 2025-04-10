import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getMongoUserId } from "../../services/firebase";
import { getSocials } from "../../api/contactApi";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram
} from "react-icons/fa";


const PreviewContactos = () => {
  const [socials, setSocials] = useState({});
  const [userId, setUserId] = useState(null);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        getMongoUserId(user.uid)
          .then((mongoId) => {
            if (mongoId) setUserId(mongoId);
          })
          .catch((error) =>
            console.error("Error obteniendo userId:", error)
          );
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadSocials = async () => {
      try {
        if (userId) {
          const { data } = await getSocials(userId);

          const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
            if (
              ["linkedin", "github", "twitter", "facebook", "instagram"].includes(key) &&
              value
            ) {
              acc[key] = value;
            }
            return acc;
          }, {});

          setSocials(filteredData);
        }
      } catch (error) {
        console.error("Error al obtener redes sociales:", error.message);
      }
    };

    loadSocials();
  }, [userId]);

  const iconMap = {
    github: <FaGithub size={24} color="#ff9800" />,
    linkedin: <FaLinkedin size={24} color="#ff9800" />,
    twitter: <FaTwitter size={24} color="#ff9800" />,
    facebook: <FaFacebook size={24} color="#ff9800" />,
    instagram: <FaInstagram size={24} color="#ff9800" />,
  };

  const getUsernameFromUrl = (url) => {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <section className="vista-previa-section">
      <h2 style={{ marginBottom: "1rem" }}>Redes Sociales</h2>

    
      {Object.keys(socials).length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Object.entries(socials).map(([key, value]) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                padding: "10px 15px",
                borderRadius: "8px"
              }}
            >
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
              >
                {iconMap[key]}
                <span style={{ color: "#fff" }}>{getUsernameFromUrl(value)}</span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#ff9800" }}>No tienes redes sociales disponibles.</p>
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
  marginBottom: "1rem",
};

export default PreviewContactos;

































































































