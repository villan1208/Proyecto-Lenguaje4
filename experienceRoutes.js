const express = require("express");
const Experience = require("../models/ExperienceModel");

const router = express.Router();

// Obtener todas las experiencias laborales de un usuario
router.get("/:userId", async (req, res) => {
  try {
    const experience = await Experience.findOne({ userId: req.params.userId });
    if (!experience) {
      return res.status(404).json({ error: "Experiencia no encontrada" });
    }
    res.status(200).json(experience);
  } catch (error) {
    console.error("❌ Error al obtener experiencias:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Añadir experiencia laboral
router.post("/:userId", async (req, res) => {
  const { company, role, startDate, endDate, description, achievements } = req.body;

  try {
    let experience = await Experience.findOne({ userId: req.params.userId });

    if (!experience) {
      experience = new Experience({ userId: req.params.userId, experiences: [] });
    }

    const newExperience = {
      company,
      role,
      startDate,
      endDate,
      description,
      achievements
    };

    experience.experiences.push(newExperience);
    await experience.save();

    res.status(201).json(experience);
  } catch (error) {
    console.error("❌ Error al crear experiencia:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Actualizar experiencia laboral
router.put("/:userId/experience/:expId", async (req, res) => {
  const { company, role, startDate, endDate, description, achievements } = req.body;

  try {
    const experience = await Experience.findOne({ userId: req.params.userId });

    if (!experience) {
      return res.status(404).json({ error: "Experiencia no encontrada" });
    }

    const expIndex = experience.experiences.findIndex((exp) => exp._id.toString() === req.params.expId);

    if (expIndex === -1) {
      return res.status(404).json({ error: "Experiencia laboral no encontrada para actualizar" });
    }

    experience.experiences[expIndex] = {
      company,
      role,
      startDate,
      endDate,
      description,
      achievements
    };

    await experience.save();
    res.status(200).json(experience);
  } catch (error) {
    console.error("❌ Error al actualizar experiencia:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Eliminar experiencia laboral
router.delete("/:userId/experience/:expId", async (req, res) => {
  try {
    const experience = await Experience.findOne({ userId: req.params.userId });

    if (!experience) {
      return res.status(404).json({ error: "Experiencia no encontrada" });
    }

    const expIndex = experience.experiences.findIndex((exp) => exp._id.toString() === req.params.expId);

    if (expIndex === -1) {
      return res.status(404).json({ error: "Experiencia laboral no encontrada para eliminar" });
    }

    experience.experiences.splice(expIndex, 1);
    await experience.save();
    res.status(200).json(experience);
  } catch (error) {
    console.error("❌ Error al eliminar experiencia:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;






















































































