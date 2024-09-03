// /Controllers/CategoryController.js

// SERVICES
const CategoryServices = require('../Services/CategoryServices');
const StoreServices = require('../Services/StoreServices');

// DTOS
const CreateCategoryDTO = require('../DTOS/CategoryDTO/CreateCategoryDTO');
const GetCategoryDTO = require('../DTOS/CategoryDTO/GetCategoryDTO');
const UpdateCategoryDTO = require('../DTOS/CategoryDTO/UpdateCategoryDTO');

class CategoryController {
    async registerCategory(req, res) {
        try {
            const { name, storeId } = req.body;
            if (!name) {
                return res.status(422).json({ message: "Field name is mandatory !!" });
            }
            if (!storeId) {
                return res.status(422).json({ message: "Field storeId is mandatory !!" });
            }

            const store = await StoreServices.getStoreById(storeId);
            if (!store) {
                return res.status(404).json({ message: "Store not found!" });
            }

            const registerCategoryDTO = new CreateCategoryDTO(name, store.id);
            const category = await CategoryServices.registerCategory(registerCategoryDTO);

            res.status(201).json(registerCategoryDTO);
        } catch (error) {
            console.error('Error in CategoryController.registerCategory:', error);
            res.status(500).json({ error: 'An error occurred while create category' });
        }
    }

    async getCategoryById(req, res) {
        try {
            const categoryId = parseInt(req.params.categoryId, 10);
            const category = await CategoryServices.getCategoryById(categoryId);

            if (!category) {
                return res.status(404).json({ message: "Category not found!" });
            }

            const categoryDTO = new GetCategoryDTO(
                category.name,
                category.storeId,
                category.createdAt,
                category.updatedAt
            );
            res.status(200).json(categoryDTO);
        } catch (error) {
            console.error('Error in CategoryController.getCategoryById:', error);
            res.status(500).json({ error: 'An error occurred while retrieving category' });
        }
    }

    async getAllCategoryByStoreId(req, res) {
        try {
            const storeId = parseInt(req.params.storeId, 10);

            const categoryes = await CategoryServices.getAllCategoryOnStore(storeId);

            if (!categoryes) {
                return res.status(404).json({ message: "Categoryes not found!" });
            }

            const categoryDTOs = categoryes.map(category => {
                return new GetCategoryDTO(
                    category.name,
                    category.storeId,
                    category.createdAt,
                    category.updatedAt
                );
            });
            res.status(200).json(categoryDTOs);
        } catch (error) {
            console.error('Error in CategoryController.getCategoryById:', error);
            res.status(500).json({ error: 'An error occurred while retrieving categoryes' });
        }
    }

    async updateCategoryById(req, res) {
        try {
            const categoryId = parseInt(req.params.categoryId, 10);
            const { name, storeId } = req.body;

            const updateCategoryDTO = new UpdateCategoryDTO(
                name,
                storeId,
                new Date(),
            );

            const updatedCategory = await CategoryServices.updateCategoryById(categoryId, updateCategoryDTO);
            if (!updatedCategory) {
                res.status(404).json({ message: "Category not found" });
            }

            res.status(200).json(updatedCategory);
        } catch (error) {
            console.error('Error in CategoryController.updateCategoryById:', error);
            res.status(500).json({ error: 'An error occurred while retrieving category' });
        }
    }

    async deleteCategoryById(req, res) {
        try {
            const categoryId = parseInt(req.params.categoryId, 10);
            const deleted = await CategoryServices.deleteCategoryById(categoryId);

            if (!deleted) {
                res.status(404).json({ message: "Category not found" });
            }

            res.status(204).json(deleted);
        } catch (error) {
            console.error('Error in CategoryController.deleteCategoryById:', error);
            res.status(500).json({ error: 'An error occurred while retrieving category' });
        }
    }
}

module.exports = new CategoryController();
