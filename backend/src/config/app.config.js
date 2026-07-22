// src/config/app.config.js
require("dotenv").config();

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
    serverUrl: process.env.SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
    env: process.env.NODE_ENV || "development",
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "super-secret-key-for-development",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
  },
  mail: {
    resendApiKey: process.env.RESEND_API_KEY,
    resendFromEmail: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    fromName: process.env.MAIL_FROM_NAME || "Soseki App",
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
  },
  upload: {
    // Default max file size is 10MB
    maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE) || 10, 
    allowedMimes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  },
  rateLimit: {
    // Default is 15 minutes window
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000,
    // Default max 500 requests per window
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX) || 500,
  }
};
