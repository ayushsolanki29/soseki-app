const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

const rateLimit = require("express-rate-limit");

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

// Global API Rate Limiter (Production Grade)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per 15 minutes
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: "Too many requests from this IP address. To ensure system stability, we have temporarily paused your access. Please try again after 15 minutes.",
    });
  },
});

// Logging
app.use(morgan("dev"));

// Body & Cookie Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
if (process.env.NODE_ENV === "production") {
  // Apply the rate limiter strictly to API routes only in production
  app.use("/api", apiLimiter);
}
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
