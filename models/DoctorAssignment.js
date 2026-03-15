const mongoose = require("mongoose");

const doctorAssignmentSchema = new mongoose.Schema({

  prediction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StressPrediction"
  },

  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },

  matchScore: Number,

  status: {
    type: String,
    enum: ["ASSIGNED", "DECLINED", "REASSIGNED"],
    default: "ASSIGNED"
  }

});

module.exports = mongoose.model("DoctorAssignment", doctorAssignmentSchema);
