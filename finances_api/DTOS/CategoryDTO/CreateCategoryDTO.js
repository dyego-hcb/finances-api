// /DTOS/CategoryDTO/CreateCategoryDTO.js

class CreateCategoryDTO {
    constructor(name, storeId) {
        this.name = name;
        this.storeId = storeId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = CreateCategoryDTO;