// /DTOS/AddressDTO/GetAddressDTO.js

class GetAddressDTO {
    constructor(street, neighborhood, number, city, state, zipCode, createdAt, updatedAt) {
        this.street = street;
        this.neighborhood = neighborhood;
        this.number = number;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = GetAddressDTO;