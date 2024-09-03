// /DTOS/AddressStoreDTO/GetAddressStoreDTO.js

class GetAddressStoreDTO {
    constructor(storeId, addressId, createdAt, updatedAt) {
        this.storeId = storeId;
        this.addressId = addressId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = GetAddressStoreDTO;