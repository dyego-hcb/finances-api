const prisma = require('../DB/conn');

module.exports = class HelloWordController {
    static checkAPIConnection(req, res) {
        res.send('Hello World!! The API is working :) !!');
    }

    static async checkDBConnection(req, res) {
        try {
            await prisma.$connect();
            res.send('Database FinacesDB connection on PostgreSQL using Prisma is working!');
        } catch (err) {
            console.error('Error connecting to PostgreSQL:', err);
            res.status(500).send('Error connecting to PostgreSQL');
        } finally {
            await prisma.$disconnect();
        }
    }
};
