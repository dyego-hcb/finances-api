// /DTOS/UserStoreDTO/CreateUserStoreDTO.js

class CreateUserStoreDTO {
    constructor(storeId, userId) {
        this.storeId = storeId;
        this.userId = userId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = CreateUserStoreDTO;