// /Services/AddressStoreServices.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AddressStoreServices {

    static async addAddressToStore(addresStoreDTO) {
        try {
            const addressStore = await prisma.storeHaveAddress.create({
                data: {
                    addressId: addresStoreDTO.addressId,
                    storeId: addresStoreDTO.storeId,
                },
            });

            return addressStore;
        } catch (error) {
            console.error('Error in AddressStoreServices.addAddressToStore:', error);
            throw new Error('Error adding address to store');
        }
    }

    static async getAllAddressToStore(storeId) {
        try {
            const addressStore = await prisma.storeHaveAddress.findMany({
                where: { storeId: storeId },
            });

            return addressStore;

        } catch (error) {
            console.error('Error in AddressStoreServices.getAllAddressToStore:', error);
            throw new Error('Error retrieving user-store records');
        }
    }

    static async getAddressToStoreById(storeId, addressId) {
        try {
            const addressStore = await prisma.storeHaveAddress.findFirst({
                where: {
                    storeId: storeId,
                    addressId: addressId,
                },
            });

            return addressStore;
        } catch (error) {
            console.error('Error in AddressStoreServices.getAddressToStoreById:', error);
            throw new Error('Error retrieving user-store record');
        }
    }

    static async updateAddressToStoreById(addressStoreId, updateAddressStoreDTO) {
        try {
            const existingAddressStore = await prisma.storeHaveAddress.findFirst({
                where: {
                    id: addressStoreId,
                },
            });

            if (!existingAddressStore) {
                throw new Error('Record not found');
            }

            const userStoreUpdate = await prisma.storeHaveAddress.update({
                where: {
                    id: addressStoreId,
                },
                data: {
                    storeId: updateAddressStoreDTO.storeId,
                    updatedAt: updateAddressStoreDTO.updatedAt,
                },
            });

            return userStoreUpdate;
        } catch (error) {
            console.error('Error in AddressStoreServices.updateAddressToStoreById:', error);
            throw new Error('Error updating address-store record');
        }
    }

    static async deleteAddressToStoreById(addressStoreId) {
        try {
            const addressStore = await prisma.storeHaveAddress.delete({
                where: { id: addressStoreId },
            });

            return addressStore;
        } catch (error) {
            console.error('Error in AddressStoreServices.deleteAddressToStoreById:', error);
            throw new Error('Error deleting user-store record');
        }
    }
}

module.exports = AddressStoreServices;