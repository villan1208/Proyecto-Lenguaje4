const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true,
  },
  experiences: [
    {
      company: { type: String, required: true },
      role: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: false },
      description: { type: String, required: true },
      achievements: { type: String, required: false },
    }
  ]
}, { timestamps: true });

const Experience = mongoose.model("Experience", ExperienceSchema, "experiencialaboral");

module.exports = Experience;


















