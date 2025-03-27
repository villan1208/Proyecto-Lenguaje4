const mongoose = require("mongoose");

const HabilidadSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  level: { 
    type: Number, 
    required: true,
    min: 1, // ✅ Nivel mínimo permitido
    max: 5  // ✅ Nivel máximo permitido
  }
}, { timestamps: true });

const Habilidad = mongoose.model("Habilidad", HabilidadSchema, "habilidades");

module.exports = Habilidad;
