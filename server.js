require("dotenv").config();
const express   = require("express");
const connectDB = require("./auth-backend/config/db");
const router     = require("./auth-backend/routes/auth.routes");
const app = express();

// ─── Connect DB ───────────────────────────────────────────────────────────────
connectDB();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/auth", router);

app.get("/", (req, res) => res.json({ status: "ok", message: "Auth API running" }));

// 404
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error("[GlobalError]", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));