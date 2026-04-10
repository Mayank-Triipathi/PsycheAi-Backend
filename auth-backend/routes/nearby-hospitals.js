const express = require("express");
const router = express.Router();

const Hospital = require("../models/Hospital");

// GET nearby hospitals
router.get("/nearby", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const hospitals = await Hospital.find({
      verified: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              parseFloat(lng),
              parseFloat(lat)
            ],
          },
        },
      },
    });

    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {router};