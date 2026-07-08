const express = require("express");
const router = express.Router();
const clientsController = require("./clients.controller");
const clientsValidation = require("./clients.validation");
const validate = require("../../middleware/validate");
const { authMiddleware } = require("../../middlewares/auth.middleware");

// All client routes require auth
router.use(authMiddleware);

router.get("/", clientsController.getClients);
router.post("/", validate(clientsValidation.createClientValidation), clientsController.createClient);
router.get("/:id", clientsController.getClientById);
router.patch("/:id", validate(clientsValidation.updateClientValidation), clientsController.updateClient);

module.exports = router;
