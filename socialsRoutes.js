const express = require("express");
const mongoose = require("mongoose");
const Socials = require("../models/Socials");
const User = require("../models/User");

const router = express.Router();

// 🟢 Crear o actualizar redes sociales
router.put("/:userId/socials", async (req, res) => {
  const { linkedin, github, twitter, facebook, instagram } = req.body;

  // Verificar que el userId es válido
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    console.error("❌ userId no es un ObjectId válido");
    return res.status(400).json({ error: "userId no es un ObjectId válido" });
  }

  try {
    // Verificar si el usuario existe en la base de datos
    const userExists = await User.findById(req.params.userId);
    if (!userExists) {
      console.error("❌ Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Buscar redes sociales existentes para el usuario
    let socials = await Socials.findOne({ userId: req.params.userId });

    if (socials) {
      // Si existen, actualizamos las redes sociales
      socials.linkedin = linkedin || socials.linkedin;
      socials.github = github || socials.github;
      socials.twitter = twitter || socials.twitter;
      socials.facebook = facebook || socials.facebook;
      socials.instagram = instagram || socials.instagram;

      await socials.save();
    } else {
      // Si no existen, creamos nuevas redes sociales
      socials = new Socials({
        userId: req.params.userId,
        linkedin,
        github,
        twitter,
        facebook,
        instagram,
      });
      await socials.save();
    }

    res.status(200).json(socials);
  } catch (error) {
    console.error("❌ Error al guardar redes sociales:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// 🔵 Obtener redes sociales de un usuario
router.get("/:userId/socials", async (req, res) => {
  // Validar que el userId es válido
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    console.error("❌ userId no es un ObjectId válido");
    return res.status(400).json({ error: "userId no es un ObjectId válido" });
  }

  try {
    // Buscar redes sociales en la base de datos para ese userId
    const socials = await Socials.findOne({ userId: req.params.userId });

    if (!socials) {
      return res.status(404).json({ message: "Redes sociales no encontradas" });
    }

    res.status(200).json(socials);
  } catch (error) {
    console.error("❌ Error al obtener redes sociales:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una red social específica de un usuario
router.delete("/:userId/socials/:network", async (req, res) => {
  const { network } = req.params;
  const validNetworks = ["linkedin", "github", "twitter", "facebook", "instagram"];

  if (!validNetworks.includes(network)) {
    return res.status(400).json({ error: "Red social no válida" });
  }

  try {
    const socials = await Socials.findOne({ userId: req.params.userId });

    if (!socials) {
      return res.status(404).json({ error: "Redes sociales no encontradas" });
    }

    // Eliminar la red social especificada
    delete socials[network];

    await socials.save(); // Guardar los cambios

    res.status(200).json(socials); // Devolver las redes sociales actualizadas
  } catch (error) {
    console.error("❌ Error al eliminar red social:", error.message);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
