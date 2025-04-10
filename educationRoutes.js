// routes/educationRoutes.js
const express = require("express");
const Education = require("../models/EducationModel");
const router = express.Router();

// GET: Obtener educación por usuario
router.get("/:userId", async (req, res) => {
  try {
    const educations = await Education.find({ userId: req.params.userId });
    res.status(200).json(educations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Agregar nueva educación
router.post("/:userId", async (req, res) => {
  const { institution, degree, startDate, endDate, description } = req.body;

  try {
    const newEducation = new Education({
      userId: req.params.userId,
      institution,
      degree,
      startDate,
      endDate,
      description
    });

    await newEducation.save();
    const updatedList = await Education.find({ userId: req.params.userId });
    res.status(201).json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Actualizar educación
router.put("/:userId/:eduId", async (req, res) => {
  try {
    await Education.findOneAndUpdate(
      { userId: req.params.userId, _id: req.params.eduId },
      req.body,
      { new: true, runValidators: true }
    );

    const updatedList = await Education.find({ userId: req.params.userId });
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Eliminar educación
router.delete("/:userId/:eduId", async (req, res) => {
  try {
    await Education.findOneAndDelete({
      userId: req.params.userId,
      _id: req.params.eduId
    });

    const updatedList = await Education.find({ userId: req.params.userId });
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
