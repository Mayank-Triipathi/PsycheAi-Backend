const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({

  name: String,

  email: { type: String, unique: true },

  phone: String,

  address: String,

  latitude: Number,
  longitude: Number,

  isVerified: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);
