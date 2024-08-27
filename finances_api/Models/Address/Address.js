class Address {
    constructor(id, street, neighborhood, number, city, state, zipCode, createdAt, updatedAt) {
        this.id = id;
        this.street = street;
        this.neighborhood = neighborhood;
        this.number = number;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getId() { return this.id; }
    setId(id) { this.id = id; }

    getStreet() { return this.street; }
    setStreet(street) { this.street = street; }

    getNeighborhood() { return this.neighborhood; }
    setNeighborhood(neighborhood) { this.neighborhood = neighborhood; }

    getNumber() { return this.number; }
    setNumber(number) { this.number = number; }

    getCity() { return this.city; }
    setCity(city) { this.city = city; }

    getState() { return this.state; }
    setState(state) { this.state = state; }

    getZipCode() { return this.zipCode; }
    setZipCode(zipCode) { this.zipCode = zipCode; }

    getCreatedAt() { return this.createdAt; }
    setCreatedAt(createdAt) { this.createdAt = createdAt; }

    getUpdatedAt() { return this.updatedAt; }
    setUpdatedAt(updatedAt) { this.updatedAt = updatedAt; }
}