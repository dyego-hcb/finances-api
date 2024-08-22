const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const GetUserAuth = async (token) => {
    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (!token) {
            throw new Error("Token not provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
