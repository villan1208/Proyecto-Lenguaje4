// models/Landing.js
const mongoose = require("mongoose");

const landingSchema = new mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model("Landing", landingSchema);
