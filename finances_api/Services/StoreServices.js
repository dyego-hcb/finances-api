// /Services/StoreService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StoreService {
    static async registerStore(registerStoreDTO) {
        try {
            const { name, cnpj, createdAt } = registerStoreDTO;

            const store = await prisma.store.create({
                data: {
                    name,
                    cnpj,
                    createdAt,
                },
            });

            return store;
        } catch (error) {
            console.error('Error in StoreService.registerStore:', error);
            throw new Error('Error creating Store');
        }
    }

    static async getStoreById(storeId) {
        try {
            const store = await prisma.store.findUnique({
                where: { id: storeId },
            });

            return store;
        } catch (error) {
            console.error('Error in StoreService.getStoreById:', error);
            throw new Error('Error fetching Store');
        }
    }

    static async getAllStores() {
        try {
            const stores = await prisma.store.findMany();
            return stores;
        } catch (error) {
            console.error('Error in StoreService.getAllStores:', error);
            throw new Error('Error fetching all stores');
        }
    }

    static async updateStoreById(storeId, updatedStoreDTO) {
        try {
            const { name, cnpj, updatedAt } = updatedStoreDTO;

            const store = await prisma.store.update({
                where: { id: storeId },
                data: {
                    name,
                    cnpj,
                    updatedAt,
                },
            });

            return store;
        } catch (error) {
            console.error('Error in StoreService.updateStoreById:', error);
            throw new Error('Error updating Store');
        }
    }

    static async deleteStoreById(storeId) {
        try {
            const store = await prisma.store.delete({
                where: { id: storeId },
            });

            return store;
        } catch (error) {
            console.error('Error in StoreService.deleteStoreById:', error);
            throw new Error('Error deleting Store');
        }
    }
}

module.exports = StoreService;
