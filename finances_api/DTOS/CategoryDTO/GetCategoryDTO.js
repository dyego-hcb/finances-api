// /DTOS/CategoryDTO/CreateCategoryDTO.js

class GetCategoryDTO {
    constructor(name, storeId, createdAt, updatedAt) {
        this.name = name;
        this.storeId = storeId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = GetCategoryDTO;