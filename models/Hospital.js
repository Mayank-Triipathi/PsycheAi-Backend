const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: String,
    address: String,

    location: {
      lat: Number,
      lng: Number,
    },

    verified: { type: Boolean, default: false },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HospitalAdmin",
    },
  },
  { timestamps: true }
);

hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);