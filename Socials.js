const mongoose = require("mongoose");

const urlValidator = (platform) => ({
  type: String,
  match: [
    /^https?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/,
    `{PATH} debe ser una URL válida`
  ]
});

const SocialsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  linkedin: urlValidator("linkedin"),
  github: urlValidator("github"),
  twitter: urlValidator("twitter"),
  facebook: urlValidator("facebook"),
  instagram: urlValidator("instagram"),
}, { timestamps: true });

const Socials = mongoose.model("Socials", SocialsSchema);
module.exports = Socials;
