import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getMongoUserId } from "../services/firebase";
import { getProjects } from "../api/projectApi";

const SectionProyectos = ({ onCompleteChange }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        getMongoUserId(user.uid)
          .then((mongoId) => {
            setUserId(mongoId);
          })
          .catch((error) => {
            console.error("Error al obtener el userId:", error);
            setError("No se pudo obtener el ID de usuario");
            setLoading(false);
            onCompleteChange("proyectos", false);
          });
      } else {
        setError("Usuario no autenticado");
        setLoading(false);
        onCompleteChange("proyectos", false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      getProjects(userId, "latest")
        .then((response) => {
          setProjects(response.data);
          onCompleteChange("proyectos", response.data.length > 0);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener proyectos:", error);
          setError("Error al cargar proyectos");
          onCompleteChange("proyectos", false);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) return <p>Cargando proyectos...</p>;

  return (
    <div className="section">
      <div className="section-header">
        <h2>Proyectos</h2>
        <button className="edit-btn" onClick={() => navigate("/proyectos")}>
          Editar
        </button>
      </div>

      {error ? (
        <p style={{ color: "#f39c12" }}>{error}</p>
      ) : (
        <div className="projects-list">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div className="project-container" key={project._id}>
                <h3 className="project-title">{project.title}</h3>
                <p><strong>Descripción:</strong> {project.description}</p>
                <p><strong>Tecnologías:</strong> {project.technologies.join(", ")}</p>
                <p><strong>Fecha:</strong> {new Date(project.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No hay proyectos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionProyectos;
























































































































































































































































































