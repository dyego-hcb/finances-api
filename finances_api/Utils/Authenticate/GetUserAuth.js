const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const GetUserAuth = async (token) => {
    try {
        if (!token) {
            throw new Error("Token not provided");
        }

        const decoded = jwt.verify(token, "4e1a3f9e18ecfcb4c8a7245d6a3e9062c1c6d5b2953b2c8a17e646d647d6e3a1");
        const userId = decoded.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        throw new Error(`Error when searching for user: ${error.message}`);
    }
}

module.exports = GetUserAuth;
