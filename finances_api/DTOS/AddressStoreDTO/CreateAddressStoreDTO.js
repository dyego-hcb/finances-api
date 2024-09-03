// /DTOS/AddressStoreDTO/CreateAddressStoreDTO.js

class CreateAddressStoreDTO {
    constructor(storeId, addressId) {
        this.storeId = storeId;
        this.addressId = addressId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = CreateAddressStoreDTO;