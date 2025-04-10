// routes/idiomasRoutes.js
const express = require("express");
const Idioma = require("../models/IdiomaModel");

const router = express.Router();

// 🔹 GET idiomas de usuario
router.get("/:userId", async (req, res) => {
  try {
    const idiomas = await Idioma.find({ userId: req.params.userId });
    res.status(200).json(idiomas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 POST nuevo idioma
router.post("/:userId", async (req, res) => {
  const { language, level } = req.body;

  try {
    const nuevoIdioma = new Idioma({
      userId: req.params.userId,
      language,
      level,
    });

    await nuevoIdioma.save();
    const idiomasActualizados = await Idioma.find({ userId: req.params.userId });
    res.status(201).json(idiomasActualizados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 PUT actualizar idioma
router.put("/:userId/:langId", async (req, res) => {
  try {
    await Idioma.findOneAndUpdate(
      { userId: req.params.userId, _id: req.params.langId },
      req.body,
      { new: true, runValidators: true }
    );

    const idiomasActualizados = await Idioma.find({ userId: req.params.userId });
    res.status(200).json(idiomasActualizados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 DELETE idioma
router.delete("/:userId/:langId", async (req, res) => {
  try {
    await Idioma.findOneAndDelete({
      userId: req.params.userId,
      _id: req.params.langId,
    });

    const idiomasActualizados = await Idioma.find({ userId: req.params.userId });
    res.status(200).json(idiomasActualizados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
