require("dotenv").config();
const app = require("./app");
const http = require("http");

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;

const server = http.createServer(app);

// Start Server
server.listen(PORT, () => {
  console.log("\n========================================");
  console.log("Soseki Backend Online");
  console.log("Server running on:", SERVER_URL);
  console.log("Client URL allowed:", CLIENT_URL);
  console.log("Health check:", `${SERVER_URL}/health`);
  console.log("Started at:", new Date().toLocaleString());
  console.log("========================================\n");
});

// Graceful Shutdown
const shutdown = () => {
  console.log("\n⚠️  Shutting down server...");

  server.close(() => {
    console.log("✅ Server closed safely.");
    process.exit(0);
  });

  setTimeout(() => {
    console.log("⏳ Forced shutdown due to timeout.");
    process.exit(1);
  }, 5000);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

module.exports = server;
