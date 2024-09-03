// /DTOS/UserStoreDTO/UpdateUserStoreDTO.js

class UpdateUserStoreDTO {
    constructor(storeId, userId) {
        this.storeId = storeId;
        this.userId = userId;
        this.updatedAt = new Date();
    }
}

module.exports = UpdateUserStoreDTO;