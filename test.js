const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Hospital = require("./models/Hospital");
const Doctor = require("./models/Doctor");
const StressPrediction = require("./models/StressPrediction");
const { matchDoctors } = require("./services/matchingService");
const { formatPrediction } = require("./utils/formatPrediction");

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
    name: "Dr Trauma",
    email: `doc1${Date.now()}@mail.com`,
    hospital: hospital._id,
    specialization: ["Trauma"],
    providerType: "Clinical Psychologist",
    availability: [{ day: "Mon", slots: ["10-11"] }]
  },
  {
    name: "Dr Relationship",
    email: `doc2${Date.now()}@mail.com`,
    hospital: hospital._id,
    specialization: ["Relationships"],
    providerType: "Counseling Psychologist",
    availability: [{ day: "Mon", slots: ["11-12"] }]
  },
  {
    name: "Dr Finance",
    email: `doc3${Date.now()}@mail.com`,
    hospital: hospital._id,
    specialization: ["Financial"],
    providerType: "Financial Counselor",
    availability: [{ day: "Mon", slots: ["12-1"] }]
  },
  {
    name: "Dr All Rounder",
    email: `doc4${Date.now()}@mail.com`,
    hospital: hospital._id,
    specialization: ["Trauma", "Relationships"],
    providerType: "Clinical Psychologist",
    availability: [{ day: "Mon", slots: ["2-3"] }]
  },
  {
    name: "Dr Psychiatrist",
    email: `doc5${Date.now()}@mail.com`,
    hospital: hospital._id,
    specialization: ["Trauma"],
    providerType: "Psychiatrist",
    availability: [{ day: "Mon", slots: ["3-4"] }]
  }
]);

    console.log("Doctors inserted");

    // 🟢 4. Create Stress Prediction (FIXED)
    const aiResponse = {
  overall_stress: 52.78,
  external_domains: {
    Trauma: 38.15,
    Relationship: 36.73,
    Financial: 25.12
  },
  top_indicators: ["feel", "partner", "mental", "past", "big"]
};

const formatted = formatPrediction(aiResponse);

const prediction = await StressPrediction.create({
  user: user._id,
  traumaStress: formatted.traumaStress,
  relationshipStress: formatted.relationshipStress,
  financialStress: formatted.financialStress,
  topIndicators: formatted.topIndicators,
  medicationNeed: formatted.medicationNeed
});

    console.log("Prediction:", prediction._id);

    // 🟢 MATCHING LOGIC
const result = await matchDoctors(prediction, hospital._id);

console.log("\n--- FINAL MATCH ---");
console.log("Primary Problem:", result.primaryProblem);
console.log("Best Doctor:", result.bestMatch.doctor.name);
console.log("Score:", result.bestMatch.score);


    process.exit();


    
  } catch (err) {
    console.error(err);
  }
}

run();