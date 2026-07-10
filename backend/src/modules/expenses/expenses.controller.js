const expensesService = require("./expenses.service");

class ExpensesController {
  async getExpenses(req, res, next) {
    try {
      const expenses = await expensesService.getExpenses(req.user.organizationId);
      return res.status(200).json({ success: true, expenses });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getExpenseById(req, res, next) {
    try {
      const expense = await expensesService.getExpenseById(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true, expense });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async createExpense(req, res, next) {
    try {
      const expense = await expensesService.createExpense(req.user.organizationId, req.body);
      return res.status(201).json({ success: true, expense });
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async updateExpense(req, res, next) {
    try {
      const expense = await expensesService.updateExpense(req.user.organizationId, req.params.id, req.body);
      return res.status(200).json({ success: true, expense });
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async deleteExpense(req, res, next) {
    try {
      await expensesService.deleteExpense(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new ExpensesController();
