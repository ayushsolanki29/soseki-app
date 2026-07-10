require("dotenv").config();

// 1. Handle Uncaught Exceptions before anything else starts
process.on("uncaughtException", (err) => {
  console.error("[FATAL] UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message, err.stack);
  process.exit(1); // Exit immediately
});

const app = require("./app");
const http = require("http");
const prisma = require("./database/prisma");

const { server: serverConfig } = require("./config/app.config");

const PORT = serverConfig.port;
const CLIENT_URL = serverConfig.clientUrl;
const SERVER_URL = serverConfig.serverUrl;

const server = http.createServer(app);

const { startEmailWorker } = require("./modules/emails/email.worker");

// 2. Start Server
server.listen(PORT, () => {
  console.log("\n========================================");
  startEmailWorker();
  console.log(`Soseki Backend Online (${serverConfig.env})`);
  console.log(`Server running on: ${SERVER_URL}`);
  console.log(`Client URLs allowed: ${CLIENT_URL}`);
  console.log(`Health check: ${SERVER_URL}/health`);
  console.log(`Started at: ${new Date().toLocaleString()}`);
  console.log("========================================\n");
});

// 3. Graceful Shutdown mechanism
const shutdown = async (signal) => {
  console.log(`\n[INFO] Received ${signal}. Shutting down gracefully...`);

  // Close server to stop accepting new incoming requests
  server.close(async () => {
    console.log("[INFO] HTTP Server closed.");
    
    // Safely disconnect Database connections
    try {
      if (prisma) {
        await prisma.$disconnect();
        console.log("[INFO] Database disconnected successfully.");
      }
    } catch (dbErr) {
      console.error("[ERROR] Error disconnecting database:", dbErr);
    }
    
    console.log("[INFO] Process terminated safely.");
    process.exit(0);
  });

  // Force shutdown if requests take too long to resolve
  setTimeout(() => {
    console.error("[WARN] Forced shutdown due to 10s timeout.");
    process.exit(1);
  }, 10000).unref(); // 10 seconds timeout
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// 4. Handle Unhandled Promise Rejections (e.g., failed DB connections, unhandled async errors)
process.on("unhandledRejection", (err) => {
  console.error("[FATAL] UNHANDLED REJECTION! Shutting down gracefully...");
  console.error(err.name, err.message, err.stack);
  // Give the server time to finish active requests before exiting
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;
