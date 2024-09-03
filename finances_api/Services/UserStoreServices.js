const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserStoreServices {
    static async addUserToStore(userId, storeId) {
        try {
            const userStore = await prisma.userHaveStore.create({
                data: {
                    userId,
                    storeId,
                },
            });

            return userStore;
        } catch (error) {
            console.error('Error in UserStoreServices.addUserToStore:', error);
            throw new Error('Error adding user to store');
        }
    }

    static async getAllStoreToUser(userId) {
        try {
            const storeUser = await prisma.userHaveStore.findMany({
                where: { userId: userId },
            });

            return storeUser;

        } catch (error) {
            console.error('Error in UserStoreServices.getAllStoreToUser:', error);
            throw new Error('Error retrieving user-store records');
        }
    }

    static async getAllUserToStore(storeId) {
        try {
            const userStore = await prisma.userHaveStore.findMany({
                where: { storeId: storeId },
            });

            return userStore;

        } catch (error) {
            console.error('Error in UserStoreServices.getAllUserToStore:', error);
            throw new Error('Error retrieving user-store records');
        }
    }


    static async getUserToStoreById(userStoreId, userId) {
        try {
            const userStore = await prisma.userHaveStore.findFirst({
                where: {
                    storeId: userStoreId,
                    userId: userId,
                },
            });

            return userStore;
        } catch (error) {
            console.error('Error in UserStoreServices.getUserToStoreById:', error);
            throw new Error('Error retrieving user-store record');
        }
    }

    static async updateUserToStoreById(userStoreId, updateUserStoreDTO) {
        try {
            const existingUserStore = await prisma.userHaveStore.findFirst({
                where: {
                    id: userStoreId,
                    userId: updateUserStoreDTO.userId,
                },
            });

            if (!existingUserStore) {
                throw new Error('Record not found');
            }

            const userStoreUpdate = await prisma.userHaveStore.update({
                where: {
                    id: userStoreId,
                },
                data: {
                    storeId: updateUserStoreDTO.storeId,
                    updatedAt: updateUserStoreDTO.updatedAt,
                },
            });

            return userStoreUpdate;
        } catch (error) {
            console.error('Error in UserStoreServices.updateUserToStoreById:', error);
            throw new Error('Error updating user-store record');
        }
    }

    static async deleteUserToStoreById(userStoreId) {
        try {
            const userStore = await prisma.userHaveStore.delete({
                where: { id: userStoreId },
            });

            return userStore;
        } catch (error) {
            console.error('Error in UserStoreServices.deleteUserToStoreById:', error);
            throw new Error('Error deleting user-store record');
        }
    }

}

module.exports = UserStoreServices;