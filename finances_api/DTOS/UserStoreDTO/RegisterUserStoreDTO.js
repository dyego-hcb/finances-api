class RegisterUserStoreDTO {
    constructor(storeId, userId, createdAt) {
        this.storeId = storeId;
        this.userId = userId;
        this.createdAt = createdAt;
    }
}

module.exports = RegisterUserStoreDTO;