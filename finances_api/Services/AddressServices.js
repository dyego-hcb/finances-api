const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AddressService {
    static async registerAddress(registerAddressDTO) {
        try {
            const { street, neighborhood, number, city, state, zipCode, createdAt } = registerAddressDTO;

            const address = await prisma.address.create({
                data: {
                    street,
                    neighborhood,
                    number,
                    city,
                    state,
                    zipCode,
                    createdAt
                },
            });

            return address;
        } catch (error) {
            console.error('Error in AddressService.registerAddress:', error);
            throw new Error('Error creating address');
        }
    }

    static async getAddressById(id) {
        try {
            const address = await prisma.address.findUnique({
                where: { id: parseInt(id) }
            });

            return address;
        } catch (error) {
            console.error('Error in AddressService.getAddressById:', error);
            throw new Error('Error fetching address');
        }
    }

    static async getAllAddresses() {
        try {
            const address = await prisma.address.findMany();
            return address;
        } catch (error) {
            console.error('Error in AddressService.getAllAddresses:', error);
            throw new Error('Error fetching addresses');
        }
    }

    static async updateAddressById(addressId, addressDTO) {
        try {
            const updatedAddress = await prisma.address.update({
                where: { id: addressId },
                data: {
                    street: addressDTO.street,
                    neighborhood: addressDTO.neighborhood,
                    number: addressDTO.number,
                    city: addressDTO.city,
                    state: addressDTO.state,
                    zipCode: addressDTO.zipCode,
                    updatedAt: addressDTO.updatedAt
                },
            });
            return updatedAddress;
        } catch (error) {
            console.error('Error in AddressService.updateAddressById:', error);
            throw new Error('Error updating address');
        }
    }

    static async deleteAddressById(id) {
        try {
            const address = await prisma.address.delete({
                where: { id: parseInt(id) }
            });

            return address;
        } catch (error) {
            console.error('Error in AddressService.updateAddressById:', error);
            throw new Error('Error deleting user');
        }
    }
}

module.exports = AddressService;