const express = require("express");
const router = express.Router();
const Landing = require("../models/landing");

// Obtener la información de la landing page
router.get("/", async (req, res) => {
  try {
    const landingData = await Landing.findOne();
    res.json(landingData);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo datos" });
  }
});

// Crear o actualizar contenido de la landing page
router.post("/", async (req, res) => {
  try {
    let landing = await Landing.findOne();
    if (landing) {
      landing.text = req.body.text;
      await landing.save();
    } else {
      landing = new Landing(req.body);
      await landing.save();
    }
    res.status(201).json(landing);
  } catch (error) {
    res.status(500).json({ message: "Error guardando datos" });
  }
});

module.exports = router;
