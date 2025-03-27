// routes/EducationRoutes.js
const express = require('express');
const router = express.Router();
const Education = require('../models/Education');

// 👉 CREATE - Agregar educación
router.post('/profile/:userId/education', async (req, res) => {
  const { institution, degree, startDate, endDate, description } = req.body;
  const { userId } = req.params;

  try {
    const education = new Education({ userId, institution, degree, startDate, endDate, description });
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar educación', error });
  }
});

// 👉 READ - Obtener todas las entradas de educación de un usuario
router.get('/profile/:userId/education', async (req, res) => {
  const { userId } = req.params;

  try {
    const educations = await Education.find({ userId });
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener educación', error });
  }
});

// 👉 UPDATE - Editar una entrada específica de educación
router.put('/education/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedEducation = await Education.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedEducation) return res.status(404).json({ message: 'Educación no encontrada' });
    res.status(200).json(updatedEducation);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar educación', error });
  }
});

// 👉 DELETE - Eliminar una entrada específica de educación
router.delete('/education/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Education.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Educación no encontrada' });
    res.status(200).json({ message: 'Educación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar educación', error });
  }
});

module.exports = router;
