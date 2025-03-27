const express = require('express');
const router = express.Router();
const Education = require('../models/Education');

// Ruta para agregar educación
router.post('/profile/:id/education', async (req, res) => {
  const { institution, degree, startDate, endDate, description } = req.body;
  try {
    const education = new Education({ institution, degree, startDate, endDate, description });
    await education.save();
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar educación' });
  }
});

// Más rutas para editar y eliminar entradas

module.exports = router;
