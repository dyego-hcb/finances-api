const StoreService = require('../Services/StoreServices');

// DTOS
const CreateStoreDTO = require('../DTOS/StoreDTO/CreateStoreDTO');
const GetStoreDTO = require('../DTOS/StoreDTO/GetStoreDTO');
const UpdateStoreDTO = require('../DTOS/StoreDTO/UpdateStoreDTO');

// UTILS
const isValidCNPJ = require('../Utils/FieldsValidade/ValidateCNPJ');

class StoreController {
    static async registerStore(req, res) {
        try {
            const { name, cnpj } = req.body;

            if (!name) {
                return res.status(422).json({ message: "Field name is mandatory !!" });
            }
            if (!cnpj || !isValidCNPJ(cnpj)) {
                return res.status(422).json({ message: "Field cnpj is mandatory and must be valid !!" });
            }

            const registerStoreDTO = new CreateStoreDTO(name, cnpj, new Date());

            const store = await StoreService.registerStore(registerStoreDTO);

            res.status(201).json(store);
        } catch (error) {
            console.error('Error in StoreController.registerStore:', error);
            res.status(500).json({ error: 'An error occurred while creating the store' });
        }
    }

    static async getStoreById(req, res) {
        try {
            const storeId = parseInt(req.params.id, 10);

            const store = await StoreService.getStoreById(storeId);

            if (!store) {
                return res.status(404).json({ message: "Store not found!" });
            }

            const getStoreDTO = new GetStoreDTO(
                store.name,
                store.cnpj,
                store.createdAt,
                store.updatedAt
            );

            res.status(200).json(getStoreDTO);
        } catch (error) {
            console.error('Error in StoreController.getStore:', error);
            res.status(500).json({ error: 'An error occurred while fetching the store' });
        }
    }

    static async getAllStores(req, res) {
        try {
            const stores = await StoreService.getAllStores();

            if (!stores) {
                return res.status(404).json({ message: "Stores not found!" });
            }

            const storesDTO = stores.map(store => new GetStoreDTO(
                store.name,
                store.cnpj,
                store.createdAt,
                store.updatedAt
            ));

            res.status(200).json(storesDTO);
        } catch (error) {
            console.error('Error in StoreController.getAllStores:', error);
            res.status(500).json({ error: 'An error occurred while fetching all stores' });
        }
    }

    static async updateStoreById(req, res) {
        try {
            const storeId = parseInt(req.params.id, 10);
            const { name, cnpj } = req.body;

            if (!name) {
                return res.status(422).json({ message: "Field name is mandatory !!" });
            }
            if (!cnpj || !isValidCNPJ(cnpj)) {
                return res.status(422).json({ message: "Field cnpj is mandatory and must be valid !!" });
            }

            const updatedStoreDTO = new UpdateStoreDTO(name, cnpj, new Date());

            const store = await StoreService.updateStoreById(storeId, updatedStoreDTO);

            if (!store) {
                return res.status(404).json({ message: "Store not found!" });
            }

            res.status(200).json(store);
        } catch (error) {
            console.error('Error in StoreController.updateStore:', error);
            res.status(500).json({ error: 'An error occurred while updating the store' });
        }
    }

    static async deleteStoreById(req, res) {
        try {
            const storeId = parseInt(req.params.id, 10);

            const store = await StoreService.deleteStoreById(storeId);

            if (!store) {
                return res.status(404).json({ message: "Store not found!" });
            }

            res.status(200).json({ message: "Store deleted successfully!" });
        } catch (error) {
            console.error('Error in StoreController.deleteStore:', error);
            res.status(500).json({ error: 'An error occurred while deleting the store' });
        }
    }
}

module.exports = StoreController;
