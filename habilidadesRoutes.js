const express = require("express");
const Habilidad = require("../models/Habilidad");

const router = express.Router();

// ✅ OBTENER todas las habilidades de un usuario → GET
router.get("/:userId", async (req, res) => {
  try {
    const habilidades = await Habilidad.find({ userId: req.params.userId });
    res.status(200).json(habilidades);
  } catch (error) {
    console.error("❌ Error al obtener habilidades:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ CREAR nueva habilidad → POST
router.post("/:userId", async (req, res) => {
  const { name, category, level } = req.body;

  try {
    if (level < 1 || level > 5) {
      return res.status(400).json({ error: "El nivel debe estar entre 1 y 5" });
    }

    const newHabilidad = new Habilidad({
      userId: req.params.userId,
      name,
      category,
      level
    });

    await newHabilidad.save();
    console.log("✅ Habilidad creada correctamente:", newHabilidad);
    res.status(201).json(newHabilidad);
  } catch (error) {
    console.error("❌ Error al crear habilidad:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ ACTUALIZAR habilidad existente → PUT
router.put("/:userId/:skillId", async (req, res) => {
  const { name, category, level } = req.body;

  try {
    if (level < 1 || level > 5) {
      return res.status(400).json({ error: "El nivel debe estar entre 1 y 5" });
    }

    const updatedHabilidad = await Habilidad.findOneAndUpdate(
      { userId: req.params.userId, _id: req.params.skillId },
      { name, category, level },
      { new: true, runValidators: true }
    );

    if (!updatedHabilidad) {
      return res.status(404).json({ error: "Habilidad no encontrada" });
    }

    console.log("✅ Habilidad actualizada correctamente:", updatedHabilidad);
    res.status(200).json(updatedHabilidad);
  } catch (error) {
    console.error("❌ Error al actualizar habilidad:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ ELIMINAR habilidad → DELETE
router.delete("/:userId/:skillId", async (req, res) => {
  try {
    const deletedHabilidad = await Habilidad.findOneAndDelete({
      userId: req.params.userId,
      _id: req.params.skillId
    });

    if (!deletedHabilidad) {
      return res.status(404).json({ error: "Habilidad no encontrada" });
    }

    console.log("✅ Habilidad eliminada correctamente:", deletedHabilidad);
    res.status(200).json({ message: "Habilidad eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar habilidad:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;











































































