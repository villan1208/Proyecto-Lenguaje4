// models/EducationModel.js
const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  description: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Education", EducationSchema, "education");
