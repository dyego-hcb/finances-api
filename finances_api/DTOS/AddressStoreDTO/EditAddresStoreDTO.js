class EditAddresStoreDTO {
    constructor(storeId, addressId, updatedAt) {
        this.storeId = storeId;
        this.addressId = addressId;
        this.updatedAt = new Date();
    }
}

module.exports = EditAddresStoreDTO;