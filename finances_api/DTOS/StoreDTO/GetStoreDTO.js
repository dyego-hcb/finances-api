class GetStoreDTO {
    constructor(name, cnpj, createdAt, updatedAt) {
        this.name = name;
        this.cnpj = cnpj;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = GetStoreDTO;