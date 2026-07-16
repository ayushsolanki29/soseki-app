const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const hpp = require("hpp");
const { rateLimit: rateLimitConfig, server: serverConfig } = require("./config/app.config");

const app = express();

// Use CLIENT_URL from config but support comma separated array
const CLIENT_URL = serverConfig.clientUrl.includes(",") 
  ? serverConfig.clientUrl.split(",").map((url) => url.trim())
  : serverConfig.clientUrl;

// 1. Trust proxy (needed for load balancers / HTTPS behind proxy in production)
app.set("trust proxy", 1);

// 2. Security Middleware
app.use(helmet()); // Set standard security HTTP headers
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// 3. Global API Rate Limiter
const apiLimiter = rateLimit({
  windowMs: rateLimitConfig.windowMs,
  max: rateLimitConfig.maxRequests,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: "Too many requests from this IP address. To ensure system stability, we have temporarily paused your access. Please try again after 15 minutes.",
    });
  },
});

// 4. Logging
if (serverConfig.env === "development") {
  app.use(morgan("dev")); // Verbose logging for dev
} else {
  app.use(morgan("combined")); // Standard Apache combined log output for prod
}

// 5. Body & Cookie Parsers
app.use(express.json({ limit: "10mb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// 6. Data Sanitization & Security
app.use(hpp()); // Prevent HTTP Parameter Pollution attacks

// 7. Compression Middleware
app.use(compression()); // Compress all responses to optimize bandwidth

// 8. Static Uploads Directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads"), {
  maxAge: "1d" // Cache static assets
}));

// 9. Routes
if (serverConfig.env === "production") {
  // Apply the rate limiter strictly to API routes only in production
  app.use("/api", apiLimiter);
}
app.use("/api", require("./modules"));

// 10. Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Project API Running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: serverConfig.env,
  });
});

// 11. 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// 12. Central Error Handler
app.use((error, req, res, next) => {
  const statusCode = error.status || error.statusCode || 500;

  if (serverConfig.env === "development") {
    console.error("[ERROR]:", error);
    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error",
      stack: error.stack,
      error: error.message || String(error),
    });
  } else {
    // Production Error Response (Don't leak stack trace)
    res.status(statusCode).json({
      success: false,
      message: error.isOperational ? error.message : "Internal server error",
    });
  }
});


module.exports = app;
