// /DB/conn.js

const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log('Connection with FinacesDB on PostgreSQL using Prisma has been successful');
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
    }
}

main().catch((err) => console.error('Unhandled error:', err));

module.exports = prisma;
