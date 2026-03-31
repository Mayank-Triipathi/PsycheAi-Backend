const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Hospital = require("./models/Hospital");
const Doctor = require("./models/Doctor");
const StressPrediction = require("./models/StressPrediction");
const { matchDoctors } = require("./services/matchingService");

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await mongoose.connection.db.dropDatabase();
console.log("Database deleted");


    // 🟢 1. Create User
    const user = await User.create({
      name: "Test User",
      email: `test${Date.now()}@mail.com`,
      password: "123456",
      phone: "9999999999",
      location: { lat: 28.61, lng: 77.23 } // Delhi
    });

    console.log("User:", user._id);

    // 🟢 2. Create Hospital
    const hospital = await Hospital.create({
      name: "City Mental Health Clinic",
      address: "Delhi",
      location: { lat: 28.61, lng: 77.23 },
      verified: true
    });

    console.log("Hospital:", hospital._id);

    // 🟢 3. Create Doctors
    const doctors = await Doctor.insertMany([
      {
        name: "Dr Trauma Expert",
        email: `doc1${Date.now()}@mail.com`,
        hospital: hospital._id,
        specialization: ["Trauma"],
        providerType: "Clinical Psychologist",
        experienceYears: 6,
        availability: [{ day: "Mon", slots: ["10-12"] }]
      },
      {
        name: "Dr Relationship Expert",
        email: `doc2${Date.now()}@mail.com`,
        hospital: hospital._id,
        specialization: ["Relationships"],
        providerType: "Counseling Psychologist",
        experienceYears: 4,
        availability: [{ day: "Tue", slots: ["2-5"] }]
      },
      {
        name: "Dr All Rounder",
        email: `doc3${Date.now()}@mail.com`,
        hospital: hospital._id,
        specialization: ["Trauma", "Relationships"],
        providerType: "Clinical Psychologist",
        experienceYears: 8,
        availability: [{ day: "Wed", slots: ["11-3"] }]
      }
    ]);

    console.log("Doctors inserted");

    // 🟢 4. Create Stress Prediction (FIXED)
    const prediction = await StressPrediction.create({
      user: user._id,
      traumaStress: 38,
      relationshipStress: 36,
      financialStress: 25,
      topIndicators: ["past", "partner"],
      medicationNeed: "MEDIUM"
    });

    console.log("Prediction:", prediction._id);

    process.exit();
  } catch (err) {
    console.error(err);
  }
}

run();