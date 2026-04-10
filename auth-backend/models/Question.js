const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

  questionText: String,

  domain: {
    type: String,
    enum: ["Financial", "Relationship", "Trauma","Emotional"]
  }

});

module.exports = mongoose.model("Question", questionSchema);
