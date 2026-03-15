const mongoose = require("mongoose");

const hospitalAdminSchema = new mongoose.Schema({

  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },

  name: String,

  email: { type: String, unique: true },

  password: String

});

module.exports = mongoose.model("HospitalAdmin", hospitalAdminSchema);
