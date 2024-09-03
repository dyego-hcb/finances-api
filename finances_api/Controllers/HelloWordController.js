// /Controllers/HelloWordController.js

const prisma = require('../DB/conn');

module.exports = class HelloWordController {
    static checkAPIConnection(req, res) {
        res.send('Hello World!! The API is working :) !!');
    }

    static async checkDBConnection(req, res) {
        try {
            await prisma.$connect();
            res.send('Hello World!! The API is workin and your database to :) !!');
        } catch (err) {
            console.error('Error connecting to PostgreSQL:', err);
            res.status(500).send('Half Hello World!! The API is workin and your database not :( !!');
        } finally {
            await prisma.$disconnect();
        }
    }
};
