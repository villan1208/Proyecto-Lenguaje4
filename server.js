require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require('./routes/contact');
const projectRoutes = require("./routes/projectRoutes");
const profileRoutes = require("./routes/profileRoutes");
const habilidadesRoutes = require("./routes/habilidadesRoutes");
const experienceRoutes = require("./routes/experienceRoutes");  // Nueva ruta de experiencia
const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api', contactRoutes);
app.use("/api/habilidades", habilidadesRoutes); // ✅ CORRECTO
app.use("/api/experiences", experienceRoutes);  // Añadir la ruta de experiencias


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
