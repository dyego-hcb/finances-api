class EditUserStoreDTO {
    constructor(storeId, userId, updatedAt) {
        this.storeId = storeId;
        this.userId = userId;
        this.updatedAt = updatedAt;
    }
}

module.exports = EditUserStoreDTO;