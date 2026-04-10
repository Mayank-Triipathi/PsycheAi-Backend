const express = require("express");
const router = express.Router();

const { matchDoctor } = require("../controllers/matchController");
const { getSlots } = require("../controllers/slotController");
const { bookAppointment } = require("../controllers/appointmentController");

router.post("/match-doctor", matchDoctor);
router.post("/get-slots", getSlots);
router.post("/book-appointment", bookAppointment);

module.exports = router;