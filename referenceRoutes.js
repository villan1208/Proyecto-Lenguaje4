const express = require("express");
const mongoose = require("mongoose");
const Reference = require("../models/Reference");
const User = require("../models/User");

const router = express.Router();

// ✅ Crear referencia
router.post("/:userId", async (req, res) => {
  const { name, relationship, testimony, imageURL } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    console.error("❌ userId no es un ObjectId válido");
    return res.status(400).json({ error: "userId no es un ObjectId válido" });
  }

  try {
    const userExists = await User.findById(req.params.userId);
    if (!userExists) {
      console.error("❌ Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const newReference = new Reference({
      userId: req.params.userId,
      name: name.trim(),
      relationship: relationship.trim(),
      testimony: testimony.trim(),
      imageURL: imageURL ? imageURL.trim() : "",
    });

    await newReference.save();
    console.log("✅ Referencia guardada correctamente");
    res.status(201).json(newReference);
  } catch (error) {
    console.error("❌ Error al guardar referencia:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Obtener referencias
router.get("/:userId", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    console.error("❌ userId no es un ObjectId válido");
    return res.status(400).json({ error: "userId no es un ObjectId válido" });
  }

  try {
    const references = await Reference.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    console.log(`✅ Referencias obtenidas: ${references.length}`);
    res.status(200).json(references);
  } catch (error) {
    console.error("❌ Error al obtener referencias:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Actualizar referencia
router.put("/:refId", async (req, res) => {
  const { name, relationship, testimony, imageURL } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.refId)) {
    console.error("❌ refId no es un ObjectId válido");
    return res.status(400).json({ error: "refId no es un ObjectId válido" });
  }

  try {
    const updatedReference = await Reference.findByIdAndUpdate(
      req.params.refId,
      {
        name,
        relationship,
        testimony,
        imageURL
      },
      { new: true }
    );

    if (!updatedReference) {
      return res.status(404).json({ error: "Referencia no encontrada" });
    }

    console.log("✅ Referencia actualizada correctamente");
    res.status(200).json(updatedReference);
  } catch (error) {
    console.error("❌ Error al actualizar referencia:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Eliminar referencia
router.delete("/:refId", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.refId)) {
    console.error("❌ refId no es un ObjectId válido");
    return res.status(400).json({ error: "refId no es un ObjectId válido" });
  }

  try {
    const deletedReference = await Reference.findByIdAndDelete(req.params.refId);

    if (!deletedReference) {
      return res.status(404).json({ error: "Referencia no encontrada" });
    }

    console.log("✅ Referencia eliminada correctamente");
    res.status(200).json({ message: "Referencia eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar referencia:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
