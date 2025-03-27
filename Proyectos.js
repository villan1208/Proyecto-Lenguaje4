import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getMongoUserId } from "../../services/firebase";
import '../../styles/Proyectos.css';

import {
  getProjects,
  getSortOrder,
  updateSortOrder,
} from "../../api/projectApi";
import ProjectForm from "../../components/ProjectForm";
import ProjectCard from "../../components/ProjectCard";

const Proyectos = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [userId, setUserId] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");

  // ✅ Obtener el _id desde Firebase y MongoDB
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log(`✅ firebaseUid obtenido desde Firebase: ${user.uid}`);

      getMongoUserId(user.uid)
        .then((mongoId) => {
          console.log(`✅ _id obtenido desde MongoDB: ${mongoId}`);
          setUserId(mongoId);

          // ✅ Obtener orden guardado en MongoDB
          loadSortOrder(mongoId);
        })
        .catch((error) =>
          console.error("❌ Error al obtener _id desde MongoDB:", error)
        );
    } else {
      console.log("❌ No se encontró ningún usuario en Firebase");
    }
  }, []);

  // ✅ Obtener orden guardado desde MongoDB
  const loadSortOrder = async (mongoId) => {
    try {
      console.log(`➡️ Buscando sortOrder en MongoDB para userId: ${mongoId}`);
      const { data } = await getSortOrder(mongoId);
      console.log(`✅ Orden guardado obtenido desde MongoDB: ${data.sortOrder}`);

      // ✅ Actualiza el estado con el orden obtenido
      if (data.sortOrder) {
        setSortOrder(data.sortOrder);
      }
    } catch (error) {
      console.error("❌ Error al obtener el orden guardado:", error.message);
    }
  };

  // ✅ Si `userId` o `sortOrder` cambian, recarga los proyectos
  useEffect(() => {
    if (userId) {
      refreshProjects();
    }
  }, [userId, sortOrder]);

  // ✅ Obtener proyectos desde la API
  const refreshProjects = async () => {
    try {
      if (!userId) return;

      console.log(`➡️ Enviando sortOrder al backend: ${sortOrder}`);
      const { data } = await getProjects(userId, sortOrder);
      console.log("✅ Proyectos obtenidos:", data);

      // ✅ Actualiza el estado con los proyectos obtenidos
      setProjects([...data]);
    } catch (error) {
      console.error("❌ Error al obtener proyectos:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  // ✅ Actualizar el orden en MongoDB al cambiar el valor del menú
  const handleSortChange = async (newSortOrder) => {
    setSortOrder(newSortOrder);
    try {
      console.log(`➡️ Guardando sortOrder en MongoDB: ${newSortOrder}`);
      await updateSortOrder(userId, newSortOrder);
      console.log(`✅ Orden guardado en MongoDB: ${newSortOrder}`);
    } catch (error) {
      console.error("❌ Error al guardar el orden:", error.message);
    }
  };

  return (
    <div className="projects-page">
      {/* Agregado el texto de bienvenida */}
      <h1 className="welcome-text">Bienvenido a la área de proyectos</h1>

      {/* ✅ Menú para ordenar proyectos */}
      <div className="project-sorting">
        <select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="latest">Más recientes</option>
          <option value="oldest">Más antiguos</option>
          <option value="alphabetical">Orden alfabético</option>
        </select>
      </div>

      {/* ✅ Formulario para añadir/editar proyectos */}
      {userId && (
        <ProjectForm
          userId={userId}
          project={editingProject}
          refreshProjects={refreshProjects}
        />
      )}

      {/* ✅ Renderizar las tarjetas de proyectos */}
      {projects.map((project, index) => (
        <ProjectCard
          key={`${project._id}-${index}`} // ✅ Clave única para detectar cambios de orden
          project={project}
          refreshProjects={refreshProjects}
          onEdit={(project) => setEditingProject(project)}
        />
      ))}
    </div>
  );
};

export default Proyectos;
