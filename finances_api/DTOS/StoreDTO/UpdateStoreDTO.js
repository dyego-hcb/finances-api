// /DTOS/StoreDTO/UpdateStoreDTO.js

class UpdateStoreDTO {
    constructor(name, cnpj) {
        this.name = name;
        this.cnpj = cnpj;
        this.updatedAt = new Date();
    }
}

module.exports = UpdateStoreDTO;