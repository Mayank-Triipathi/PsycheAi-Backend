const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
{
  name: String,
  email: { type: String, unique: true },
  password: String,

  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },

  specialization: [
    {
      type: String,
      enum: ["Trauma", "Relationships", "Financial", "Emotional"],
    },
  ],

  providerType: {
  type: String,
  default: "Psychiatrist"
},

  experienceYears: Number,

  availability: [
    {
      day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      slots: [String]
    }
  ],

  isActive: { type: Boolean, default: true },

},
{ timestamps: true }
);

doctorSchema.index({ specialization: 1 });
doctorSchema.index({ hospital: 1 });

module.exports = mongoose.model("Doctor", doctorSchema);