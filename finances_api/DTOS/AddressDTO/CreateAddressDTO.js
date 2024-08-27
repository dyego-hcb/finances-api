class CreateAddressDTO {
    constructor(street, neighborhood, number, city, state, zipCode, createdAt) {
        this.street = street;
        this.neighborhood = neighborhood;
        this.number = number;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.createdAt = createdAt;
    }
}

module.exports = CreateAddressDTO;