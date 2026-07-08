const prisma = require('./prisma');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('Seeding the database...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Super Admin
  const existingSuperAdmin = await prisma.superUser.findUnique({
    where: { email: 'super@soseki.com' },
  });

  if (!existingSuperAdmin) {
    const superAdmin = await prisma.superUser.create({
      data: {
        email: 'super@soseki.com',
        passwordHash,
        name: 'Super Admin',
      },
    });
    console.log('Created Super Admin:', superAdmin.email);
  } else {
    console.log('Super Admin user already exists, skipping creation.');
  }

  // 2. Create Demo User
  const existingUser = await prisma.user.findUnique({
    where: { email: 'demo@soseki.com' },
  });

  if (!existingUser) {
    const demoUser = await prisma.user.create({
      data: {
        email: 'demo@soseki.com',
        passwordHash,
        name: 'Demo Owner',
      },
    });
    console.log('Created Demo User:', demoUser.email);
  } else {
    console.log('Demo User already exists, skipping creation.');
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });