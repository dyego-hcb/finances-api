// /DTOS/CategoryDTO/UpdateCategoryDTO.js

class GetCategoryDTO {
    constructor(name, storeId) {
        this.name = name;
        this.storeId = storeId;
        this.updatedAt = new Date();
    }
}

module.exports = GetCategoryDTO;