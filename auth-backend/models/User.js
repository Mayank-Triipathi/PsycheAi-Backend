const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  phone: String,

  password: { type: String, required: true },

  address: String,

  latitude: Number,
  longitude: Number,

  role: {
    type: String,
    default: "USER"
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
