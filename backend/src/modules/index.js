const express = require('express');
const router = express.Router();

// Import routes

const authRoutes = require('./auth/auth.routes');
const usersRoutes = require('./users/users.routes');
const organizationRoutes = require('./organization/organization.routes');
const clientsRoutes = require('./clients/clients.routes');
const projectsRoutes = require('./projects/projects.routes');
const leadsRoutes = require('./leads/leads.routes');
const trackingRoutes = require('./tracking/tracking.routes');
const invoicesRoutes = require('./invoices/invoices.routes');
const expensesRoutes = require('./expenses/expenses.routes');
const paymentsRoutes = require('./payments/payments.routes');
const supportTicketsRoutes = require('./support-tickets/support-tickets.routes');
const questionnairesRoutes = require('./questionnaires/questionnaires.routes');
const quickItemsRoutes = require('./quick-items/quick-items.routes');
const dashboardRoutes = require('./dashboard/dashboard.routes');
const superAdminRoutes = require('./super-admin/super-admin.routes');
const migrationRoutes = require('./migration/migration.routes');

// Define routes

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/organization', organizationRoutes);
router.use('/clients', clientsRoutes);
router.use('/projects', projectsRoutes);
router.use('/leads', leadsRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/expenses', expensesRoutes);
router.use('/payments', paymentsRoutes);
router.use('/support-tickets', supportTicketsRoutes);
router.use('/questionnaires', questionnairesRoutes);
router.use('/quick-items', quickItemsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/super-admin', superAdminRoutes);
router.use('/tracking', trackingRoutes);
router.use('/migration', migrationRoutes);

module.exports = router;
