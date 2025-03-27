const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  technologies: { 
    type: [{ type: String }],
    default: [] // ✅ Si no hay technologies, enviar array vacío
  },
  link: { type: String },
  images: { 
    type: [{ type: String }],
    default: [] // ✅ Si no hay imágenes, enviar array vacío
  },
  date: { 
    type: Date, 
    required: true // ✅ Fecha requerida para ordenar correctamente
  }
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
