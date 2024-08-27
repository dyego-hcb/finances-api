class UpdateAddressDTO {
    constructor(street, neighborhood, number, city, state, zipCode, updatedAt) {
        this.street = street;
        this.neighborhood = neighborhood;
        this.number = number;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.updatedAt = new Date();
    }
}

module.exports = UpdateAddressDTO;