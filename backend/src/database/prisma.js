// src/database/prisma.js
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

// Create a new pool using the connection string from environment variables
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create a new Prisma adapter for PostgreSQL
const adapter = new PrismaPg(pool);

// Instantiate PrismaClient with the adapter
const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

module.exports = prisma;