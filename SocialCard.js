import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

// Mapeo de red social a componente de ícono y color
const iconMap = {
  github: { icon: FaGithub, color: "#333" },
  linkedin: { icon: FaLinkedin, color: "#0077B5" },
  twitter: { icon: FaTwitter, color: "#1DA1F2" },
  facebook: { icon: FaFacebook, color: "#1877F2" },
  instagram: { icon: FaInstagram, color: "#E1306C" },
};

const SocialCard = ({ name, url, onEdit, onDelete }) => {
  if (!url) return null;

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar ${name}?`)) {
      onDelete(name);
    }
  };

  const iconInfo = iconMap[name];
  const IconComponent = iconInfo?.icon;
  const iconColor = iconInfo?.color || "#000";

  return (
    <div className="social-card" style={{ marginBottom: "20px" }}>
      {/* Usamos flexbox para alinear el contenido */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        {/* Ícono clicable con color */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href={url} target="_blank" rel="noopener noreferrer" title={name}>
            {IconComponent ? <IconComponent size={40} color={iconColor} /> : <strong>{name}</strong>}
          </a>

          {/* Enlace visible como texto */}
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "18px" }}>
            {url}
          </a>
        </div>

        {/* Botones de editar y eliminar a la derecha */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => onEdit(name, url)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
