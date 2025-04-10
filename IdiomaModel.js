// models/IdiomaModel.js
const mongoose = require("mongoose");

const IdiomaSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    enum: ["Básico", "Intermedio", "Avanzado", "Nativo"],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Idioma", IdiomaSchema, "idiomas");
