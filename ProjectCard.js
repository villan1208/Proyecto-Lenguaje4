import React, { useState } from "react";
import { deleteProject } from "../api/projectApi";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ProjectCard = ({ project, refreshProjects, onEdit }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este proyecto?")) {
      try {
        await deleteProject(project._id);
        refreshProjects(); // ✅ Actualizar lista de proyectos después de eliminar
        console.log("✅ Proyecto eliminado correctamente");
      } catch (error) {
        console.error("❌ Error al eliminar proyecto:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="project-card">
      {/* ✅ TÍTULO */}
      <h3>{project.title}</h3>

      {/* ✅ DESCRIPCIÓN */}
      <p>{project.description}</p>

      {/* ✅ TECNOLOGÍAS */}
      <p>
        <strong>Tecnologías:</strong> {project.technologies.join(", ")}
      </p>

      {/* ✅ ENLACE */}
      {project.link && (
        <p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            Ver Proyecto
          </a>
        </p>
      )}

      {/* ✅ FECHA */}
      <p>
        <strong>Fecha:</strong> {new Date(project.date).toLocaleDateString()}
      </p>

      {/* ✅ IMÁGENES CON LIGHTBOX */}
      {project.images.length > 0 && (
        <>
          <button onClick={() => setOpen(true)}>Ver Imágenes</button>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={project.images.map((img) => ({ src: img }))}
          />
        </>
      )}

      {/* ✅ BOTONES DE ACCIÓN */}
      <div className="project-actions">
        <button onClick={() => onEdit(project)}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default ProjectCard;
