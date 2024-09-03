// /DTOS/AddressStoreDTO/UpdateAddressStoreDTO.js

class UpdateAddressStoreDTO {
    constructor(storeId, addressId) {
        this.storeId = storeId;
        this.addressId = addressId;
        this.updatedAt = new Date();
    }
}

module.exports = UpdateAddressStoreDTO;