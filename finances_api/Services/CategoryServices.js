// /Services/CategoryServices.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoryServices {
    static async registerCategory(registerCategoryDTO) {
        try {
            const { name, storeId, createdAt, updatedAt } = registerCategoryDTO;

            const category = await prisma.category.create({
                data: {
                    name,
                    storeId,
                    createdAt,
                    updatedAt
                },
            });

            return category;
        } catch (error) {
            console.error('Error in CategoryServices.registerCategory:', error);
            throw new Error('Error creating category');
        }
    }

    static async getCategoryById(id) {
        try {
            const category = await prisma.category.findUnique({
                where: { id: id }
            });

            return category;
        } catch (error) {
            console.error('Error in CategoryService.getCategoryById:', error);
            throw new Error('Error fetching cateogry');
        }
    }

    static async getAllCategoryOnStore(storeId) {
        try {
            const categoryStore = await prisma.category.findMany({
                where: { storeId: storeId },
            });

            return categoryStore;

        } catch (error) {
            console.error('Error in CategoryStoreServices.getAllCategoryToStore:', error);
            throw new Error('Error retrieving categoryes records');
        }
    }

    static async updateCategoryById(categoryId, categoryDTO) {
        try {
            const updatedCategory = await prisma.category.update({
                where: { id: categoryId },
                data: {
                    name: categoryDTO.name,
                    storeId: categoryDTO.storeId,
                    createdAt: categoryDTO.createdAt,
                    updatedAt: categoryDTO.updatedAt
                },
            });
            return updatedCategory;
        } catch (error) {
            console.error('Error in CategoryService.updateCategoryById:', error);
            throw new Error('Error updating category');
        }
    }

    static async deleteCategoryById(id) {
        try {
            const category = await prisma.category.delete({
                where: { id: parseInt(id) }
            });

            return category;
        } catch (error) {
            console.error('Error in CategoryService.deleteCategoryById:', error);
            throw new Error('Error deleting categorie');
        }
    }
}

module.exports = CategoryServices;