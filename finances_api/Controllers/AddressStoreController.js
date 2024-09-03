// /Controllers/AddressStoreController.js

// CONTROLLERS
const AddressStoreServices = require('../Services/AddressStoreServices');
const StoreServices = require('../Services/StoreServices');
const AddressServices = require('../Services/AddressServices');

// DTOS
const CreateAddressStoreDTO = require('../DTOS/AddressStoreDTO/CreateAddressStoreDTO');
const UpdateAddressStoreDTO = require('../DTOS/AddressStoreDTO/UpdateAddressStoreDTO');
const GetAddressStoreDTO = require('../DTOS/AddressStoreDTO/GetAddressStoreDTO');

class AddressStoreController {

    static async addAddressToStore(req, res) {
        try {
            const { addressId, storeId } = req.body;

            if (!addressId || !storeId) {
                return res.status(422).json({ message: "Address ID and Store ID are required" });
            }

            const address = await AddressServices.getAddressById(addressId);
            if (!address) {
                return res.status(404).json({ message: "Address not found!" });
            }

            const store = await StoreServices.getStoreById(storeId);
            if (!store) {
                return res.status(404).json({ message: "Store not found!" });
            }

            const addressStore = await AddressStoreServices.addAddressToStore(addressId, storeId);

            const registerAddressStoreDTO = new CreateAddressStoreDTO(
                addressStore.storeId,
                addressStore.addressId,
            );

            res.status(200).json(registerAddressStoreDTO);
        } catch (error) {
            console.error('Error in AddressStoreController.addAddressToStore:', error);
            res.status(500).json({ error: 'An error occurred while adding the address to the store' });
        }
    }

    static async getAllAddressToStore(req, res) {
        try {
            const storeId = parseInt(req.params.storeId, 10);
            const addressStores = await AddressStoreServices.getAllAddressToStore(storeId);

            if (!addressStores || addressStores.length === 0) {
                return res.status(404).json({ message: "No address-store records found!" });
            }

            const addressStoreDTOs = addressStores.map(addressStore => new GetAddressStoreDTO(
                addressStore.storeId,
                addressStore.addressId,
                addressStore.createdAt,
                addressStore.updatedAt,
            ));

            res.status(200).json(addressStoreDTOs);
        } catch (error) {
            console.error('Error in AddressStoreController.getAllAddressToStore:', error);
            res.status(500).json({ error: 'An error occurred while retrieving address-store records' });
        }
    }


    static async getAddressToStoreById(req, res) {
        try {
            const { addressStoreId, addressId } = req.params;

            const addressStore = await AddressStoreServices.getAddressToStoreById(parseInt(addressStoreId, 10), parseInt(addressId, 10));

            if (!addressStore) {
                return res.status(404).json({ message: "Address or Store not found!" });
            }

            const addressStoreDTO = new GetAddressStoreDTO(
                addressStore.storeId,
                addressStore.addressId,
                addressStore.createdAt,
                addressStore.updatedAt,
            );

            res.status(200).json(addressStoreDTO);
        } catch (error) {
            console.error('Error in AddressStoreController.getAddressToStoreById:', error);
            res.status(500).json({ error: 'An error occurred while retrieving the address-store record' });
        }
    }

    static async updateAddressToStoreById(req, res) {
        try {
            const addressStoreId = parseInt(req.params.addressStoreId, 10);
            const { addressId, storeId } = req.body;

            if (!addressId || !storeId) {
                return res.status(422).json({ message: "Address ID and Store ID are required" });
            }

            const address = await AddressServices.getAddressById(addressId);
            if (!address) {
                return res.status(404).json({ message: "Address not found!" });
            }

            const store = await StoreServices.getStoreById(storeId);
            if (!store) {
                return res.status(404).json({ message: "Store not found!" });
            }

            const editAddressStoreDTO = new UpdateAddressStoreDTO(
                storeId,
                addressId
            );

            const updatedAddressStore = await AddressStoreServices.updateAddressToStoreById(addressStoreId, editAddressStoreDTO);

            if (!updatedAddressStore) {
                return res.status(404).json({ message: "Address or Store not found!" });
            }

            res.status(200).json(editAddressStoreDTO);
        } catch (error) {
            console.error('Error in AddressStoreController.updateAddressToStoreById:', error);
            res.status(500).json({ error: 'An error occurred while updating the address-store record' });
        }
    }

    static async deleteAddressToStoreById(req, res) {
        try {
            const addressStoreId = parseInt(req.params.addressStoreId, 10);

            const deletedAddressStore = await AddressStoreServices.deleteAddressToStoreById(addressStoreId);

            if (!deletedAddressStore) {
                return res.status(404).json({ message: "Address or Store not found!" });
            }

            res.status(200).json({ message: 'Address-store record deleted successfully' });
        } catch (error) {
            console.error('Error in AddressStoreController.deleteAddressToStoreById:', error);
            res.status(500).json({ error: 'An error occurred while deleting the address-store record' });
        }
    }
}

module.exports = AddressStoreController;