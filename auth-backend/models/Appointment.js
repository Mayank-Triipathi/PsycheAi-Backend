const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },

  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },

  prediction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StressPrediction"
  },

  appointmentDate: Date,

  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
    default: "PENDING"
  }

});

module.exports = mongoose.model("Appointment", appointmentSchema);
