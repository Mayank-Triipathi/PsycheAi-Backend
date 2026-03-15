const Admin    = require("../models/Admin");
const Hospital = require("../models/Hospital");
const { generateToken } = require("../utils/jwt");
const { success, error } = require("../utils/response");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return error(res, "Email already registered", 409);

    const admin = await Admin.create({ name, email, password });
    const token = generateToken({ id: admin._id, email: admin.email }, "admin");

    return success(res, { admin, token }, "Admin registered", 201);
  } catch (err) {
    console.error("[admin:register]", err);
    return error(res, "Registration failed");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) return error(res, "Invalid email or password", 401);

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return error(res, "Invalid email or password", 401);

    const token = generateToken({ id: admin._id, email: admin.email }, "admin");

    admin.password = undefined;
    return success(res, { admin, token }, "Login successful");
  } catch (err) {
    console.error("[admin:login]", err);
    return error(res, "Login failed");
  }
};

const getProfile = async (req, res) => {
  return success(res, { admin: req.admin }, "Profile fetched");
};

// Admin verifies a hospital so it can access protected routes
const verifyHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospital_id);
    if (!hospital) return error(res, "Hospital not found", 404);
    if (hospital.is_verified) return error(res, "Hospital is already verified", 400);

    hospital.is_verified = true;
    hospital.admin_id    = req.admin._id;
    hospital.verified_at = new Date();
    await hospital.save();

    return success(res, { hospital }, "Hospital verified successfully");
  } catch (err) {
    console.error("[admin:verifyHospital]", err);
    return error(res, "Verification failed");
  }
};

module.exports = { register, login, getProfile, verifyHospital };