const express = require("express");
const router = express.Router();
const supportTicketsController = require("./support-tickets.controller");
const supportTicketsValidation = require("./support-tickets.validation");
const validate = require("../../middleware/validate.middleware");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", supportTicketsController.getTickets);
router.post("/", validate(supportTicketsValidation.createTicketValidation), supportTicketsController.createTicket);
router.get("/:id", supportTicketsController.getTicketById);
router.patch("/:id", validate(supportTicketsValidation.updateTicketValidation), supportTicketsController.updateTicket);
router.post("/:id/messages", validate(supportTicketsValidation.addMessageValidation), supportTicketsController.addMessage);

module.exports = router;
