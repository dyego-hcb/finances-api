// /DTOS/StoreDTO/CreateStoreDTO.js

class CreateStoreDTO {
    constructor(name, cnpj) {
        this.name = name;
        this.cnpj = cnpj;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = CreateStoreDTO;