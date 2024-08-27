class GetAddresStoreDTO {
    constructor(storeId, addressId, createdAt, updatedAt) {
        this.storeId = storeId;
        this.addressId = addressId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = GetAddresStoreDTO;