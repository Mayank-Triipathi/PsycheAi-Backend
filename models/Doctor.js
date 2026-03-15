const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },

  name: String,

  email: { type: String, unique: true },

  specialization: String,

  expertiseDomains: [String],
  availability: {
    type: Boolean,
    default: true
  }

});

module.exports = mongoose.model("Doctor", doctorSchema);
