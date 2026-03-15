const mongoose = require("mongoose");

const chatSessionSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },

  consentToShare: Boolean

}, { timestamps: true });

module.exports = mongoose.model("ChatSession", chatSessionSchema);
