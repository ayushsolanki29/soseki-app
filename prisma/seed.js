const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database...');
  // Add your seed data here.
  // Example:
  // await prisma.user.create({
  //   data: { email: 'admin@workora.com', name: 'Admin User' }
  // });
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
