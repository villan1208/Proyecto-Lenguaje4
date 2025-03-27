// models/Education.js
const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Education', EducationSchema);
