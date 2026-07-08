const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "*";

// Trust proxy (for load balancers / HTTPS behind proxy)
app.set("trust proxy", 1);

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Logging
app.use(morgan("dev"));

// Body & Cookie Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api", require("./modules"));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Project API Running ✅",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 for all not-matched routes (Express v5 safe)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Central Error Handler
app.use((error, req, res, next) => {
  console.error("🔥 Error:", error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

module.exports = app;
