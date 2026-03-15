const express = require("express");
const router  = express.Router();

const userCtrl     = require("../controllers/userAuth.controller");
const adminCtrl    = require("../controllers/adminAuth.controller");
const hospitalCtrl = require("../controllers/hospitalAuth.controller");

const { authenticate, requireVerified } = require("../middleware/auth");
const {
  validate,
  userRegisterSchema, userLoginSchema,
  adminRegisterSchema, adminLoginSchema,
  hospitalRegisterSchema, hospitalLoginSchema,
  changePasswordSchema,
} = require("../utils/validators");

// ─── User ─────────────────────────────────────────────────────────────────────
router.post("/user/register",         validate(userRegisterSchema),  userCtrl.register);
router.post("/user/login",            validate(userLoginSchema),     userCtrl.login);
router.get( "/user/me",               authenticate("user"),          userCtrl.getProfile);
router.put( "/user/change-password",  authenticate("user"), validate(changePasswordSchema), userCtrl.changePassword);

// ─── Admin ────────────────────────────────────────────────────────────────────
router.post( "/admin/register",                      validate(adminRegisterSchema), adminCtrl.register);
router.post( "/admin/login",                         validate(adminLoginSchema),    adminCtrl.login);
router.get(  "/admin/me",                            authenticate("admin"),         adminCtrl.getProfile);
router.patch("/admin/verify-hospital/:hospital_id",  authenticate("admin"),         adminCtrl.verifyHospital);

// ─── Hospital ─────────────────────────────────────────────────────────────────
router.post("/hospital/register",        validate(hospitalRegisterSchema), hospitalCtrl.register);
router.post("/hospital/login",           validate(hospitalLoginSchema),    hospitalCtrl.login);
router.get( "/hospital/me",              authenticate("hospital"),         hospitalCtrl.getProfile);
router.get( "/hospital/dashboard",       authenticate("hospital"), requireVerified, hospitalCtrl.getProfile);
router.put( "/hospital/change-password", authenticate("hospital"), validate(changePasswordSchema), hospitalCtrl.changePassword);

module.exports = router;