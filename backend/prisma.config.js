const { defineConfig } = require('@prisma/config');
require('dotenv').config();

module.exports = defineConfig({
    datasource: {
        url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
});
