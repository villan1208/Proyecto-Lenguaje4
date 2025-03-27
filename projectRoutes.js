const express = require("express");
const mongoose = require("mongoose");
const Project = require("../models/Project");
const User = require("../models/User");

const router = express.Router();

// 🟢 Crear proyecto
router.post("/:userId", async (req, res) => {
  const { title, description, technologies, link, images, date } = req.body;

  console.log(`✅ userId recibido en el backend: ${req.params.userId}`);
  console.log(`✅ Datos recibidos:`, req.body);

  // ✅ Validar `userId`
  if (!req.params.userId) {
    console.error("❌ userId es requerido");
    return res.status(400).json({ error: "userId es requerido" });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    console.error("❌ userId no es un ObjectId válido");
    return res.status(400).json({ error: "userId no es un ObjectId válido" });
  }

  try {
    // ✅ Verificar que el usuario exista en la colección `users`
    console.log(`➡️ Buscando usuario en MongoDB con _id: ${req.params.userId}`);
    const userExists = await User.findById(req.params.userId);
    if (!userExists) {
      console.error("❌ userId no existe en la colección users");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // ✅ Validar campos requeridos
    if (!title || !description || !date) {
      console.error("❌ title, description o date están vacíos");
      return res.status(400).json({ error: "Título, descripción y fecha son obligatorios" });
    }

    console.log("✅ Valores recibidos correctamente. Preparando para guardar...");

    // ✅ Convertir valores nulos o indefinidos a valores por defecto
    const formattedTechnologies = technologies && Array.isArray(technologies)
      ? technologies.map((tech) => tech.trim())
      : [];
    
    const formattedImages = images && Array.isArray(images)
      ? images.map((img) => img.trim())
      : [];

    // ✅ Convertir `date` a formato de fecha
    const formattedDate = new Date(date);

    // ✅ 🚀 Convertir `userId` a `ObjectId` con `new`
    const userId = new mongoose.Types.ObjectId(req.params.userId);

    const newProject = new Project({
      userId, // ✅ `ObjectId` ahora es válido
      title: title.trim(),
      description: description.trim(),
      technologies: formattedTechnologies,
      link: link ? link.trim() : "",
      images: formattedImages,
      date: formattedDate // ✅ Guardar fecha
    });

    console.log(`➡️ Guardando proyecto en MongoDB: ${JSON.stringify(newProject)}`);

    await newProject.save(); // ✅ Guardar en MongoDB
    console.log("✅ Proyecto guardado correctamente en MongoDB");

    res.status(201).json(newProject);
  } catch (error) {
    console.error("❌ Error al crear proyecto:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// 🔵 Obtener proyectos de un usuario (con ordenación)
router.get("/:userId", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      console.error("❌ userId no es un ObjectId válido");
      return res.status(400).json({ error: "userId no es un ObjectId válido" });
    }

    const sortOrder = req.query.sortOrder || "latest"; // ✅ Parámetro de ordenación
    let sort = {};

    if (sortOrder === "latest") {
      sort = { date: -1 }; // ✅ Ordenar por fecha (más reciente primero)
    } else if (sortOrder === "oldest") {
      sort = { date: 1 }; // ✅ Ordenar por fecha (más antigua primero)
    } else if (sortOrder === "alphabetical") {
      sort = { title: 1 }; // ✅ Ordenar por título (alfabético)
    }

    console.log(`✅ Ordenando proyectos por: ${sortOrder}`);

    const projects = await Project.find({ userId: req.params.userId }).sort(sort);
    console.log(`✅ Proyectos obtenidos: ${projects.length}`);

    res.status(200).json(projects);
  } catch (error) {
    console.error("❌ Error al obtener proyectos:", error.message);
    res.status(500).json({ error: "Error al obtener proyectos" });
  }
});

// 🟠 Actualizar proyecto
router.put("/:projectId", async (req, res) => {
  const { title, description, technologies, link, images, date } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
      console.error("❌ projectId no es un ObjectId válido");
      return res.status(400).json({ error: "projectId no es un ObjectId válido" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        title: title?.trim(),
        description: description?.trim(),
        technologies: technologies || [],
        link: link || "",
        images: images || [],
        date: date ? new Date(date) : new Date() // ✅ Convertir fecha a formato Date
      },
      { new: true }
    );

    if (!updatedProject) {
      console.error("❌ Proyecto no encontrado para actualizar");
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    console.log("✅ Proyecto actualizado correctamente");
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("❌ Error al actualizar proyecto:", error.message);
    res.status(500).json({ error: "Error al actualizar proyecto" });
  }
});

// 🔴 Eliminar proyecto
router.delete("/:projectId", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
      console.error("❌ projectId no es un ObjectId válido");
      return res.status(400).json({ error: "projectId no es un ObjectId válido" });
    }

    const deletedProject = await Project.findByIdAndDelete(req.params.projectId);

    if (!deletedProject) {
      console.error("❌ Proyecto no encontrado para eliminar");
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    console.log("✅ Proyecto eliminado correctamente");
    res.status(200).json({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar proyecto:", error.message);
    res.status(500).json({ error: "Error al eliminar proyecto" });
  }
});

module.exports = router;
