const AddressService = require('../Services/AddressServices');

// DTOS
const CreateAddressDTO = require('../DTOS/AddressDTO/CreateAddressDTO');
const GetAddressDTO = require('../DTOS/AddressDTO/GetAddressDTO');
const UpdateAddressDTO = require('../DTOS/AddressDTO/UpdateAddressDTO');

// UTILS
const isValidZipCode = require('../Utils/FieldsValidade/ValidateZipCode');

class AddressController {
    async registerAddress(req, res) {
        try {
            const { street, neighborhood, number, city, state, zipCode } = req.body;

            if (!street) {
                return res.status(422).json({ message: "Field street is mandatory !!" });
            }
            if (!neighborhood) {
                return res.status(422).json({ message: "Field neighborhood is mandatory !!" });
            }
            if (!number) {
                return res.status(422).json({ message: "Field number is mandatory !!" });
            }
            if (!city) {
                return res.status(422).json({ message: "Field city is mandatory !!" });
            }
            if (!state) {
                return res.status(422).json({ message: "Field state is mandatory !!" });
            }
            if (!zipCode || !isValidZipCode(zipCode)) {
                return res.status(422).json({ message: "Field zip code is mandatory and must be a valid zip code !!" });
            }

            const registerAddressDTO = new CreateAddressDTO(street, neighborhood, number, city, state, zipCode, new Date());
            const address = await AddressService.registerAddress(registerAddressDTO);
            res.status(201).json(address);
        } catch (error) {
            console.error('Error in AddressController.registerAddress:', error);
            res.status(500).json({ error: 'An error occurred while retrieving users' });
        }
    }

    async getAddressById(req, res) {
        try {
            const { id } = req.params;
            const address = await AddressService.getAddressById(id);

            if (!address) {
                return res.status(404).json({ message: "Address not found!" });
            }

            const addressDTO = new GetAddressDTO(
                address.street,
                address.neighborhood,
                address.number,
                address.city,
                address.state,
                address.zipCode,
                address.createdAt,
                address.updatedAt
            );
            res.status(200).json(addressDTO);
        } catch (error) {
            console.error('Error in AddressController.getAddressById:', error);
            res.status(500).json({ error: 'An error occurred while retrieving users' });
        }
    }

    async getAllAddresss(req, res) {
        try {
            const addresses = await AddressService.getAllAddresses();

            if (!addresses) {
                return res.status(404).json({ message: "Addresses not found!" });
            }

            const addressDTOs = addresses.map(address => {
                return new GetAddressDTO(
                    address.street,
                    address.neighborhood,
                    address.number,
                    address.city,
                    address.state,
                    address.zipCode,
                    address.createdAt,
                    address.updatedAt
                );
            });

            res.status(200).json(addressDTOs);
        } catch (error) {
            console.error('Error in AddressController.getAllAddresss:', error);
            res.status(500).json({ error: 'An error occurred while retrieving users' });
        }
    }

    async updateAddressById(req, res) {
        try {
            const addressId = parseInt(req.params.id, 10);
            const { street, neighborhood, number, city, state, zipCode } = req.body;

            const updateAddressDTO = new UpdateAddressDTO(
                street,
                neighborhood,
                number,
                city,
                state,
                zipCode,
                new Date(),
            );

            const updatedAddress = await AddressService.updateAddressById(addressId, updateAddressDTO);
            if (!updatedAddress) {
                res.status(404).json({ message: "Address not found" });
            }

            res.status(200).json(updatedAddress);
        } catch (error) {
            console.error('Error in AddressController.updateAddressById:', error);
            res.status(500).json({ error: 'An error occurred while retrieving users' });
        }
    }

    async deleteAddressById(req, res) {
        try {
            const { id } = req.params;
            const deleted = await AddressService.deleteAddressById(id);

            if (!deleted) {
                res.status(404).json({ message: "Address not found" });
            }

            res.status(204).json();
        } catch (error) {
            console.error('Error in AddressController.deleteAddressById:', error);
            res.status(500).json({ error: 'An error occurred while retrieving users' });
        }
    }
}

module.exports = new AddressController();
