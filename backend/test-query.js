const prisma = require('./src/database/prisma.js');
prisma.organization.findUnique({
  where: { id: 'ec8041e4-3697-407d-84d5-e4cf99a1555a' },
  include: {
    profile: true,
    _count: { select: { users: true, projects: true, clients: true, invoices: true } },
    users: { select: { id: true, name: true, email: true, createdAt: true } }
  }
}).then(res => console.log('OK')).catch(err => {
  console.error(err.message);
}).finally(() => prisma.$disconnect());
