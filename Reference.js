const mongoose = require("mongoose");

const ReferenceSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  relationship: { 
    type: String, 
    required: true 
  },
  testimony: { 
    type: String, 
    required: true 
  },
  imageURL: { 
    type: String 
  }
}, { timestamps: true });

const Reference = mongoose.model("Reference", ReferenceSchema);
module.exports = Reference;
