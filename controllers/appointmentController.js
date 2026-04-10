const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const { getAvailableSlots } = require("../utils/getAvailableSlots");

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, hospitalId, date, slot, day } = req.body;
    const { userId } = req.body;

    const doctor = await Doctor.findById(doctorId);
    const hospital = await Hospital.findById(hospitalId);

    if (!doctor || !hospital) {
      return res.status(404).json({ message: "Invalid data" });
    }

    // 🔹 Check slot availability
    const slots = await getAvailableSlots(doctor, date, day);

    if (!slots.includes(slot)) {
      return res.status(400).json({ message: "Slot not available" });
    }

    // 🔹 Booking type logic 
    let status = "pending";

    if (hospital.bookingType === "AUTO") {
      status = "confirmed";
    }

    // 🔹 Create appointment
 

    res.json({
      message:
        status === "confirmed"
          ? "Appointment confirmed"
          : "Appointment request sent",
      appointment
    });

  } catch (err) {
  console.error(err);
  res.status(500).json({ message: "Server error", error: err.message });
}
};

module.exports = { bookAppointment };