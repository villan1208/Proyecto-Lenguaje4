import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getMongoUserId } from "../services/firebase";
import { getSocials } from "../api/contactApi";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram
} from "react-icons/fa";

const SectionContacto = ({ onCompleteChange }) => {
  const navigate = useNavigate();
  const [socials, setSocials] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        getMongoUserId(user.uid)
          .then((mongoId) => {
            if (mongoId) {
              setUserId(mongoId);
            } else {
              onCompleteChange("contacto", false);
            }
          })
          .catch((error) => {
            console.error("❌ Error obteniendo userId:", error);
            onCompleteChange("contacto", false);
          });
      } else {
        onCompleteChange("contacto", false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadSocials = async () => {
      if (!userId) return;
      try {
        const { data } = await getSocials(userId);
        const filtered = Object.fromEntries(
          Object.entries(data).filter(
            ([key, val]) =>
              ["linkedin", "github", "twitter", "facebook", "instagram"].includes(key) && val
          )
        );
        setSocials(filtered);
        onCompleteChange("contacto", Object.keys(filtered).length > 0);
      } catch (error) {
        console.error("❌ Error al obtener redes sociales:", error.message);
        onCompleteChange("contacto", false);
      }
    };

    loadSocials();
  }, [userId]);

  const iconMap = {
    github: <FaGithub size={40} color="#333" />,
    linkedin: <FaLinkedin size={40} color="#0077B5" />,
    twitter: <FaTwitter size={40} color="#1DA1F2" />,
    facebook: <FaFacebook size={40} color="#1877F2" />,
    instagram: <FaInstagram size={40} color="#E1306C" />,
  };

  const getUsernameFromUrl = (url) => {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div
      className="section"
      style={{
        padding: "20px",
        backgroundColor: "#2a3b4c",
        color: "white",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #ff9800",
          paddingBottom: "10px",
        }}
      >
        <h2>Contactos</h2>
        <button
          onClick={() => navigate("/contactos")}
          style={{
            backgroundColor: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 14px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Editar
        </button>
      </div>

      <div
        style={{
          margin: "15px 0",
          borderBottom: "1px solid #ff9800",
        }}
      ></div>

      {Object.keys(socials).length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {Object.entries(socials).map(([key, value]) => (
            <div
              key={key}
              style={{
                background: "linear-gradient(135deg, #475072, #2e3192, #134a81)",
                padding: "16px 20px",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ff9800",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ff9800" }}
                >
                  {iconMap[key]}
                </a>
                <span style={{ color: "white" }}>{getUsernameFromUrl(value)}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#ff9800" }}>No tienes redes sociales guardadas.</p>
      )}
    </div>
  );
};

export default SectionContacto;














































































































































































































































































