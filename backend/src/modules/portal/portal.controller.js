const portalService = require("./portal.service");

/**
 * Get Client Profile for Portal
 */
exports.getClientProfile = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const profile = await portalService.getClientProfile(clientId);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Client Projects for Portal
 */
exports.getClientProjects = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const projects = await portalService.getClientProjects(clientId);
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Client Project by ID for Portal
 */
exports.getClientProjectById = async (req, res, next) => {
  try {
    const { clientId, projectId } = req.params;
    const project = await portalService.getClientProjectById(clientId, projectId);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Client Invoices for Portal
 */
exports.getClientInvoices = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const invoices = await portalService.getClientInvoices(clientId);
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Client Invoice by ID for Portal
 */
exports.getClientInvoiceById = async (req, res, next) => {
  try {
    const { clientId, invoiceId } = req.params;
    const invoice = await portalService.getClientInvoiceById(clientId, invoiceId);
    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};
