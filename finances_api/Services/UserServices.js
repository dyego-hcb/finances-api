const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

class UserService {
    static async registerUser(registerUserDTO) {
        try {
            const { name, cpf, birthDate, email, password, createdAt } = registerUserDTO;

            const user = await prisma.user.create({
                data: {
                    name,
                    cpf,
                    birthDate: new Date(birthDate).toISOString(),
                    email,
                    password,
                    createdAt,
                },
            });

            return user;
        } catch (error) {
            console.error('Error in UserService.registerUser:', error);
            throw new Error('Error creating user');
        }
    }

    static async authenticateUser(loginUserDTO) {
        try {
            const { email, password } = loginUserDTO;

            const user = await prisma.user.findUnique({
                where: { email: email }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            return user;
        } catch (error) {
            console.error('Error in UserService.authenticateUser:', error);
            throw new Error('Authentication failed');
        }
    }

    static async getAllUsers() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            console.error('Error in UserService.getAllUsers:', error);
            throw new Error('Error fetching users');
        }
    }

    static async getUserById(userId) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            return user;
        } catch (error) {
            console.error('Error in UserService.getUserById:', error);
            throw new Error('Error retrieving user by ID');
        }
    }

    static async updateAuthenticateUser(userId, updateUserDTO) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    name: updateUserDTO.name,
                    cpf: updateUserDTO.cpf,
                    birthDate: new Date(updateUserDTO.birthDate).toISOString(),
                    email: updateUserDTO.email,
                    password: updateUserDTO.password,
                    updatedAt: updateUserDTO.updatedAt,
                },
            });

            return updatedUser;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    static async updateUserById(userId, updateUserDTO) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    name: updateUserDTO.name,
                    cpf: updateUserDTO.cpf,
                    birthDate: new Date(updateUserDTO.birthDate).toISOString(),
                    email: updateUserDTO.email,
                    password: updateUserDTO.password,
                    updatedAt: updateUserDTO.updatedAt,
                },
            });

            return updatedUser;
        } catch (error) {
            console.error('Error in UserService.updateUserById:', error);
            throw new Error('Error updating user');
        }
    }

    static async deleteUserById(userId) {
        try {
            const user = await prisma.user.delete({
                where: { id: userId },
            });

            return user;
        } catch (error) {
            console.error('Error in UserService.deleteUserById:', error);
            throw new Error('Error deleting user');
        }
    }

    static async deleteAuthenticatedUser(userId) {
        try {
            const user = await prisma.user.delete({
                where: { id: userId },
            });

            return user;
        } catch (error) {
            console.error('Error in UserService.deleteAuthenticatedUser:', error);
            throw new Error('Error deleting authenticated user');
        }
    }
}

module.exports = UserService;
