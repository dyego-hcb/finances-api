class UpdateStoreDTO {
    constructor(name, cnpj, updatedAt) {
        this.name = name;
        this.cnpj = cnpj;
        this.updatedAt = new Date();
    }
}

module.exports = UpdateStoreDTO;