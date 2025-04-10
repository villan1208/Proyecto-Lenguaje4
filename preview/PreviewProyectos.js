import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getMongoUserId } from "../../services/firebase";
import { getProjects } from "../../api/projectApi";

const PreviewProyectos = () => {
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        getMongoUserId(user.uid)
          .then((mongoId) => setUserId(mongoId))
          .catch((error) => {
            console.error("Error al obtener el userId:", error);
            setError("No se pudo obtener el ID de usuario");
            setLoading(false);
          });
      } else {
        setError("Usuario no autenticado");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      getProjects(userId, "latest")
        .then((response) => {
          setProjects(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener proyectos:", error);
          setError("Error al cargar proyectos");
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) return <p>Cargando proyectos...</p>;

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.headerTitle}>Proyectos</h2>
      </div>

      {error ? (
        <p style={styles.errorText}>{error}</p>
      ) : (
        <div style={styles.projectsList}>
          {projects.length > 0 ? (
            <div style={styles.projectsGrid}>
              {projects.map((project) => (
                <div style={styles.projectContainer} key={project._id}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  <p style={styles.projectDescription}>
                    <strong>Descripción:</strong> {project.description}
                  </p>
                  <p style={styles.projectTechnologies}>
                    <strong>Tecnologías:</strong> {project.technologies.join(", ")}
                  </p>
                  <p style={styles.projectDate}>
                    <strong>Fecha:</strong> {new Date(project.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay proyectos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  section: {
    padding: "2rem",
    borderRadius: "15px",
    color: "#fff",
    marginBottom: "2rem",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  headerTitle: {
    fontSize: "2.2rem",
    color: "#ffffff",
    marginBottom: "1.5rem",
    borderBottom: "2px solid #ff9800",
    paddingBottom: "0.5rem",
  },
  errorText: {
    color: "#f39c12",
    textAlign: "center",
    fontSize: "1rem",
  },
  projectsList: {
    marginTop: "1.5rem",
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2rem",
  },
  projectContainer: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
    color: "#fff",
  },
  projectTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#ff9800",
    marginBottom: "1rem",
  },
  projectDescription: {
    fontSize: "1rem",
    marginBottom: "0.5rem",
    color: "#ccc",
  },
  projectTechnologies: {
    fontSize: "1rem",
    marginBottom: "0.5rem",
    color: "#ccc",
  },
  projectDate: {
    fontSize: "1rem",
    fontStyle: "italic",
    color: "#ccc",
  },
};

export default PreviewProyectos;






















































































































































































































































































































































































































