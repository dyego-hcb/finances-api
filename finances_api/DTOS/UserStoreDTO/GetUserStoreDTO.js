class GetUserStoreDTO {
    constructor(storeId, userId, createdAt, updatedAt) {
        this.storeId = storeId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = GetUserStoreDTO;