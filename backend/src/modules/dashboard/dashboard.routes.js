const express = require("express");
const router = express.Router();
const dashboardController = require("./dashboard.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");

const searchRoutes = require("../search/search.routes");

router.use(authMiddleware);

router.use("/search", searchRoutes);
router.get("/stats", dashboardController.getStats);
router.get("/charts", dashboardController.getCharts);
router.get("/data", dashboardController.getDashboardData);

module.exports = router;
