// /Controllers/UserStoreController.js

// SERVICES
const UserStoreServices = require('../Services/UserStoreServices');
const UserServices = require('../Services/UserServices');
const StoreServices = require('../Services/StoreServices');

// DTOS
const CreateUserStoreDTO = require('../DTOS/UserStoreDTO/CreateUserStoreDTO');
const UpdateUserStoreDTO = require('../DTOS/UserStoreDTO/UpdateUserStoreDTO');
const GetUserStoreDTO = require('../DTOS/UserStoreDTO/GetUserStoreDTO');

class UserStoreController {

    static async addUserToStore(req, res) {
        try {
            const { userId, storeId } = req.body;

            if (!userId || !storeId) {
                return res.status(422).json({ message: "User ID and Store ID are required" });
            }

            const user = await UserServices.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            const store = await StoreServices.getStoreById(storeId);
            if (!store) {
                return res.status(404).json({ message: "Store not found!" });
            }

            if (user.userType === 'USER') {
                const storeCount = await UserStoreServices.getAllStoreToUser(userId);
                if (storeCount.length > 0) {
                    return res.status(422).json({ message: "User as type USER, and can't be associated with more than one store" });
                }
            }

            const registerUserStoreDTO = new CreateUserStoreDTO(
                storeId,
                userId,
            );

            const userStore = await UserStoreServices.addUserToStore(registerUserStoreDTO);

            res.status(200).json(registerUserStoreDTO);
        } catch (error) {
            console.error('Error in UserStoreController.addUserToStore:', error);
            res.status(500).json({ error: 'An error occurred while adding the user to the store' });
        }
    }

    static async getAllStoreToUser(req, res) {
        try {
            const userId = parseInt(req.params.userId, 10);
            const userStores = await UserStoreServices.getAllStoreToUser(userId);

            if (!userStores || userStores.length === 0) {
                return res.status(404).json({ message: "No user-store records found!" });
            }

            const userStoreDTOs = userStores.map(userStore => new GetUserStoreDTO(
                userStore.storeId,
                userStore.userId,
                userStore.createdAt,
                userStore.updatedAt,
            ));

            res.status(200).json(userStoreDTOs);
        } catch (error) {
            console.error('Error in UserStoreController.getAllUserToStore:', error);
            res.status(500).json({ error: 'An error occurred while retrieving user-store records' });
        }
    }

    static async getAllUserToStore(req, res) {
        try {
            const storeId = parseInt(req.params.storeId, 10);
            const userStores = await UserStoreServices.getAllUserToStore(storeId);

            if (!userStores || userStores.length === 0) {
                return res.status(404).json({ message: "No user-store records found!" });
            }

            const userStoreDTOs = userStores.map(userStore => new GetUserStoreDTO(
                userStore.storeId,
                userStore.userId,
                userStore.createdAt,
                userStore.updatedAt,
            ));

            res.status(200).json(userStoreDTOs);
        } catch (error) {
            console.error('Error in UserStoreController.getAllUserToStore:', error);
            res.status(500).json({ error: 'An error occurred while retrieving user-store records' });
        }
    }


    static async getUserToStoreById(req, res) {
        try {
            const { userStoreId, userId } = req.params;

            const userStore = await UserStoreServices.getUserToStoreById(parseInt(userStoreId, 10), parseInt(userId, 10));

            if (!userStore) {
                return res.status(404).json({ message: "User or Store not found!" });
            }

            const userStoreDTO = new GetUserStoreDTO(
                userStore.storeId,
                userStore.userId,
                userStore.createdAt,
                userStore.updatedAt,
            );

            res.status(200).json(userStoreDTO);
        } catch (error) {
            console.error('Error in UserStoreController.getUserToStoreById:', error);
            res.status(500).json({ error: 'An error occurred while retrieving the user-store record' });
        }
    }

    static async updateUserToStoreById(req, res) {
        try {
            const userStoreId = parseInt(req.params.userStoreId, 10);
            const { userId, storeId } = req.body;

            if (!userId || !storeId) {
                return res.status(422).json({ message: "User ID and Store ID are required" });
            }

            const user = await UserServices.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            const store = await StoreServices.getStoreById(storeId);
            if (!store) {
                return res.status(404).json({ message: "Store not found!" });
            }

            const userHaveStore = await UserStoreServices.getAllStoreToUser(user.id);
            if (userHaveStore.length === 0) {
                throw new Error("User does not have any registered store. Operation not permitted.");
            }

            const storeExists = userHaveStore.some(store => store.id === storeId);
            if (!storeExists) {
                throw new Error("User is not authorized to modify this store. Operation not permitted.");
            }

            const editUserStoreDTO = new UpdateUserStoreDTO(
                storeId,
                userId
            );

            const updatedUserStore = await UserStoreServices.updateUserToStoreById(userStoreId, editUserStoreDTO);

            if (!updatedUserStore) {
                return res.status(404).json({ message: "User or Store not found!" });
            }

            res.status(200).json(editUserStoreDTO);
        } catch (error) {
            console.error('Error in UserStoreController.updateUserToStoreById:', error);
            res.status(500).json({ error: 'An error occurred while updating the user-store record' });
        }
    }

    static async deleteUserToStoreById(req, res) {
        try {
            const userStoreId = parseInt(req.params.userStoreId, 10);

            const deletedUserStore = await UserStoreServices.deleteUserToStoreById(userStoreId);

            if (!deletedUserStore) {
                return res.status(404).json({ message: "User or Store not found!" });
            }

            res.status(200).json({ message: 'User-store record deleted successfully' });
        } catch (error) {
            console.error('Error in UserStoreController.deleteUserToStoreById:', error);
            res.status(500).json({ error: 'An error occurred while deleting the user-store record' });
        }
    }
}

module.exports = UserStoreController;
