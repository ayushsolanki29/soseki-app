const express = require("express");
const router = express.Router();
const expensesController = require("./expenses.controller");
const expensesValidation = require("./expenses.validation");
const validate = require("../../middleware/validate.middleware");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", expensesController.getExpenses);
router.post("/", validate(expensesValidation.createExpenseValidation), expensesController.createExpense);
router.patch("/:id", validate(expensesValidation.updateExpenseValidation), expensesController.updateExpense);
router.delete("/:id", expensesController.deleteExpense);

module.exports = router;
