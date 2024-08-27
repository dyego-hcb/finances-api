class CreateStoreDTO {
    constructor(name, cnpj, createdAt) {
        this.name = name;
        this.cnpj = cnpj;
        this.createdAt = createdAt;
    }
}

module.exports = CreateStoreDTO;