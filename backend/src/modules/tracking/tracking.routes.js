const express = require("express");
const router = express.Router();
const trackingController = require("./tracking.controller");

router.post("/visit", trackingController.trackVisit);

module.exports = router;
