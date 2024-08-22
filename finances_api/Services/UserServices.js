const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserService {
    static async registerUser(registerUserDTO) {
        try {
            const { name, cpf, birthDate, email, password, createdAt } = registerUserDTO;

            const user = await prisma.user.create({
                data: {
                    name,
                    cpf,
                    birthDate,
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

    static async updateUser(userId, updateUserDTO) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    name: updateUserDTO.name,
                    cpf: updateUserDTO.cpf,
                    birthDate: updateUserDTO.birthDate,
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
}

module.exports = UserService;
