const mongoose = require("mongoose");

const stressPredictionSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  chatSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatSession"
  },

  financial: Number,
  relationship: Number,
  trauma: Number,
  emotional: Number,

  overallStress: Number

}, { timestamps: true });

module.exports = mongoose.model("StressPrediction", stressPredictionSchema);
