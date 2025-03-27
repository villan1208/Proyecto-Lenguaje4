import React, { useState, useEffect } from "react";
import { createProject, updateProject } from "../api/projectApi";

const ProjectForm = ({ userId, project, refreshProjects }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [link, setLink] = useState("");
  const [images, setImages] = useState("");
  const [date, setDate] = useState("");

  // ✅ Sincronizar el estado con el proyecto seleccionado
  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setTechnologies(project.technologies?.join(", ") || "");
      setLink(project.link || "");
      setImages(project.images?.join(", ") || "");
      setDate(project.date ? new Date(project.date).toISOString().split("T")[0] : "");
    } else {
      // ✅ Limpiar el formulario si no hay proyecto
      setTitle("");
      setDescription("");
      setTechnologies("");
      setLink("");
      setImages("");
      setDate("");
    }
  }, [project]);

  // ✅ Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Error: No se ha detectado el usuario");
      console.error("❌ userId no disponible");
      return;
    }

    if (!title || !description || !date) {
      alert("Título, descripción y fecha son obligatorios");
      console.error("❌ Campos requeridos faltantes");
      return;
    }

    const data = {
      title: title.trim(),
      description: description.trim(),
      technologies: technologies ? technologies.split(",").map((tech) => tech.trim()) : [],
      link: link ? link.trim() : "",
      images: images ? images.split(",").map((img) => img.trim()) : [],
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
    };

    try {
      if (project) {
        console.log(`🟠 Actualizando proyecto con id: ${project._id}`);
        await updateProject(project._id, data);
      } else {
        console.log(`🟢 Creando nuevo proyecto para userId: ${userId}`);
        await createProject(userId, data);
      }
      refreshProjects(); // ✅ Actualizar proyectos después de guardar
    } catch (error) {
      console.error("❌ Error al guardar el proyecto:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      {/* ✅ CAMPO DE FECHA */}
      <label>Fecha del Proyecto:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      {/* ✅ TÍTULO */}
      <label>Título del Proyecto:</label>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* ✅ DESCRIPCIÓN */}
      <label>Descripción:</label>
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* ✅ TECNOLOGÍAS */}
      <label>Tecnologías (separadas por coma):</label>
      <input
        type="text"
        placeholder="React, Node.js, MongoDB"
        value={technologies}
        onChange={(e) => setTechnologies(e.target.value)}
      />

      {/* ✅ ENLACE */}
      <label>Enlace (opcional):</label>
      <input
        type="url"
        placeholder="https://github.com/ejemplo"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      {/* ✅ IMÁGENES */}
      <label>Imágenes (URLs separadas por coma):</label>
      <input
        type="text"
        placeholder="https://imagen.com/1.png, https://imagen.com/2.png"
        value={images}
        onChange={(e) => setImages(e.target.value)}
      />

      {/* ✅ BOTÓN DE ENVÍO */}
      <button type="submit">
        {project ? "Actualizar Proyecto" : "Crear Proyecto"}
      </button>
    </form>
  );
};

export default ProjectForm;
