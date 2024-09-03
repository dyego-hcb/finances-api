// /DTOS/AddressDTO/CreateAddressDTO.js

class CreateAddressDTO {
    constructor(street, neighborhood, number, city, state, zipCode) {
        this.street = street;
        this.neighborhood = neighborhood;
        this.number = number;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = CreateAddressDTO;